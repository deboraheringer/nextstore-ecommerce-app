"use client";

import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export function CartSheet() {
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">Shopping Cart</span>
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-neutral-500 space-y-2">
              <ShoppingBag className="h-12 w-12 text-neutral-300" />
              <p className="font-medium">Your cart is empty</p>
              <p className="text-xs text-neutral-400">Add products to start shopping.</p>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-4 border-b pb-4 last:border-b-0"
              >
                {/* Imagem do Produto */}
                <div className="relative h-16 w-16 rounded bg-neutral-100 flex-shrink-0 overflow-hidden">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info do Produto */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium line-clamp-1">{product.title}</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    ${product.price.toFixed(2)} each
                  </p>

                  {/* Controle de Quantidade */}
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <span className="text-xs font-semibold px-1">{quantity}</span>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Subtotal & Remover */}
                <div className="flex flex-col items-end justify-between self-stretch">
                  <span className="text-sm font-bold">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-neutral-400 hover:text-red-600"
                    onClick={() => removeFromCart(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé do Carrinho */}
        {cart.length > 0 && (
          <SheetFooter className="border-t pt-4 flex-col gap-3 sm:flex-col">
            <div className="flex justify-between items-center w-full">
              <span className="text-sm text-neutral-600">Total</span>
              <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full font-semibold">Proceed to Checkout</Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}