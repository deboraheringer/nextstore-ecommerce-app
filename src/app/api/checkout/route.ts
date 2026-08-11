import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { CartItem } from "@/types/product";

export async function POST(req: Request) {
  try {
    const { items }: { items: CartItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    const lineItems = items.map((item) => {
      // Valida se a imagem é uma URL completa; caso contrário, ignora o envio da imagem para não quebrar a Stripe
      const isValidImageUrl = item.product.thumbnail?.startsWith("http");

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.title,
            description: item.product.description || undefined,
            ...(isValidImageUrl && { images: [item.product.thumbnail] }),
          },
          unit_amount: Math.round(item.product.price * 100), // Preço em centavos
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["BR", "US", "CA"],
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Stripe checkout error details:", errorMessage);

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}