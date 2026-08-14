import type Stripe from "stripe";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders, orderItems, users } from "@/db/schema";
import { stripe } from "@/lib/stripe";

function getLineItemProductId(item: Stripe.LineItem) {
  const product = item.price?.product;
  const productMetadataId =
    typeof product === "object" && product !== null && "metadata" in product
      ? product.metadata.productId
      : undefined;

  const productId = item.metadata?.productId ?? productMetadataId;

  if (!productId) {
    throw new Error(`Product ID ausente no item ${item.id}`);
  }

  const parsedProductId = Number.parseInt(productId, 10);

  if (Number.isNaN(parsedProductId)) {
    throw new Error(`Product ID invalido no item ${item.id}: ${productId}`);
  }

  return parsedProductId;
}

export async function fulfillCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    throw new Error(`Checkout Session ${session.id} ainda nao esta paga`);
  }

  if (!session.customer_details?.email) {
    throw new Error(`Email ausente na sessao ${session.id}`);
  }

  if (session.amount_total === null) {
    throw new Error(`Total ausente na sessao ${session.id}`);
  }

  const existingOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.stripeSessionId, session.id))
    .limit(1);

  if (existingOrders[0]) {
    return existingOrders[0];
  }

  const existingUsers = await db
    .select()
    .from(users)
    .where(eq(users.email, session.customer_details.email))
    .limit(1);

  let user = existingUsers[0];

  if (!user) {
    const insertedUsers = await db
      .insert(users)
      .values({
        email: session.customer_details.email,
        name: session.customer_details.name ?? "",
      })
      .returning();

    user = insertedUsers[0];
  }

  const insertedOrders = await db
    .insert(orders)
    .values({
      userId: user.id,
      stripeSessionId: session.id,
      status: "paid",
      totalAmount: (session.amount_total / 100).toString(),
      shippingAddress:
        session.collected_information?.shipping_details?.address ?? null,
    })
    .returning();

  const newOrder = insertedOrders[0];

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    expand: ["data.price.product"],
  });

  if (lineItems.data.length > 0) {
    const itemsToInsert = lineItems.data.map((item) => ({
      orderId: newOrder.id,
      productId: getLineItemProductId(item),
      productTitle: item.description ?? "Produto",
      price: (item.amount_total / 100 / (item.quantity ?? 1)).toString(),
      quantity: item.quantity ?? 1,
    }));

    await db.insert(orderItems).values(itemsToInsert);
  }

  return newOrder;
}
