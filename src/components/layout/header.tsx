import Link from "next/link";
import { ShoppingBag, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        
        {/* Logo / Nome do Projeto */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-neutral-900">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span>NextStore</span>
        </Link>

        {/* Barra de Pesquisa */}
        <div className="flex-1 max-w-md hidden md:flex relative">
          <Input 
            type="search" 
            placeholder="Search products..." 
            className="w-full pl-9"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        </div>

        {/* Ações / Botão do Carrinho */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Shopping Cart</span>
            {/* Badge de contagem temporário para a UI */}
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              0
            </Badge>
          </Button>
        </div>

      </div>
    </header>
  );
}