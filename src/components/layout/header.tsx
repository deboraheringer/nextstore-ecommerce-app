"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { CartSheet } from "@/components/cart/cart-sheet";
import { SearchBar } from "@/components/layout/search-bar";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-neutral-900">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span>NextStore</span>
        </Link>

        {/* Substituímos pelo componente isolado SearchBar */}
        <SearchBar />

        <div className="flex items-center gap-2">
          <CartSheet />
        </div>

      </div>
    </header>
  );
}