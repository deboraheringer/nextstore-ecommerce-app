import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { fulfillCheckoutSession } from "@/lib/fulfill-checkout";
import { stripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature");

  if (!signature) {
    return new NextResponse("Stripe signature ausente", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Falha na verificacao da assinatura";
    console.error(`Falha na verificacao da assinatura: ${errorMessage}`);
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const newOrder = await fulfillCheckoutSession(session.id);
      console.log(`Pedido ${newOrder.id} processado com sucesso.`);
    } catch (dbError) {
      console.error("Erro na operacao do banco de dados:", dbError);
      return new NextResponse("Database Error", { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
