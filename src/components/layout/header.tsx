"use client";

import Link from "next/link";
import { ShoppingBag, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CartSheet } from "@/components/cart/cart-sheet"; // Importamos o CartSheet

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-neutral-900">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span>NextStore</span>
        </Link>

        <div className="flex-1 max-w-md hidden md:flex relative">
          <Input 
            type="search" 
            placeholder="Search products..." 
            className="w-full pl-9"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        </div>

        <div className="flex items-center gap-2">
          <CartSheet />
        </div>

      </div>
    </header>
  );
}