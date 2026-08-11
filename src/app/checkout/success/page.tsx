"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const { clearCart } = useCart();
  const hasCleared = useRef(false);

  useEffect(() => {
    // Garante a execução única, mesmo no modo Strict do React
    if (!hasCleared.current) {
      clearCart();
      hasCleared.current = true;
    }
  }, [clearCart]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center container mx-auto px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-6">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-2">
        Payment Successful!
      </h1>

      <p className="text-neutral-600 max-w-md mb-8">
        Thank you for your purchase. We have received your order and are processing it.
      </p>

      <Button asChild size="lg" className="gap-2 font-semibold">
        <Link href="/">
          <ShoppingBag className="h-4 w-4" />
          Continue Shopping
        </Link>
      </Button>
    </div>
  );
}