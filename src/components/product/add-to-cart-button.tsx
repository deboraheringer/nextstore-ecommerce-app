"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Adiciona a quantidade especificada ao carrinho
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Seletor de Quantidade */}
      <div className="flex items-center border rounded-md">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          className="h-10 w-10 rounded-none"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-12 text-center text-sm font-semibold">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setQuantity((prev) => prev + 1)}
          className="h-10 w-10 rounded-none"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Botão Principal */}
      <Button onClick={handleAddToCart} className="flex-1 h-10 gap-2 font-semibold">
        <ShoppingBag className="h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  );
}