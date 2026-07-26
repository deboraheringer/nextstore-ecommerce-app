"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategorySidebarProps {
  categories: string[];
}

export function CategorySidebar({ categories }: CategorySidebarProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  // Formata o nome da categoria para exibição
  const formatCategoryName = (name: string) => {
    return name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-4">
      <div className="bg-white p-4 rounded-xl border">
        <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Tag className="h-4 w-4 text-primary" />
          Categories
        </h2>

        <nav className="flex flex-col space-y-1 max-h-[70vh] overflow-y-auto pr-1">
          {/* Opção para Ver Todos */}
          <Button
            asChild
            variant={!currentCategory ? "secondary" : "ghost"}
            className="justify-start font-medium text-sm h-9"
          >
            <Link href="/">
              <LayoutGrid className="h-4 w-4 mr-2" />
              All Products
            </Link>
          </Button>

          {/* Lista de Categorias Dinâmicas */}
          {categories.map((category) => {
            const isActive = currentCategory === category;
            return (
              <Button
                key={category}
                asChild
                variant={isActive ? "secondary" : "ghost"}
                className={`justify-start text-sm h-9 capitalize ${
                  isActive ? "font-bold text-primary" : "text-neutral-600 font-normal"
                }`}
              >
                <Link href={`/?category=${encodeURIComponent(category)}`}>
                  {formatCategoryName(category)}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}