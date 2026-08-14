import { NextResponse } from "next/server";
import { fulfillCheckoutSession } from "@/lib/fulfill-checkout";

export async function POST(req: Request) {
  try {
    const { sessionId }: { sessionId?: string } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Checkout Session ID ausente" },
        { status: 400 }
      );
    }

    const order = await fulfillCheckoutSession(sessionId);

    return NextResponse.json({ orderId: order.id });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("Checkout fulfillment error:", errorMessage);

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
