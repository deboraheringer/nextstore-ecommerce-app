"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchProducts } from "@/services/api";
import { Product } from "@/types/product";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounce para buscar sugestões sem sobrecarregar a API
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setIsLoading(true);
        try {
          const data = await searchProducts(query.trim());
          // Pegamos apenas as primeiras 5 sugestões
          setSuggestions(data.products.slice(0, 5));
          setIsOpen(true);
        } catch (error) {
          console.error("Failed to fetch suggestions", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Fecha o autocomplete se clicar fora do componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/");
    }
  };

  const handleSelectSuggestion = (title: string) => {
    setQuery(title);
    setIsOpen(false);
    router.push(`/?q=${encodeURIComponent(title)}`);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setIsOpen(false);
    router.push("/");
  };

  return (
    <div ref={searchContainerRef} className="flex-1 max-w-md hidden md:flex relative">
      <form onSubmit={handleSearch} className="w-full relative">
        <Input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          className="w-full pl-9 pr-8"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />

        {/* Spinner de Carregamento ou Botão de Limpar */}
        {isLoading ? (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 animate-spin" />
        ) : query ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-neutral-400 hover:text-neutral-700"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        ) : null}
      </form>

      {/* Dropdown de Sugestões (Autocomplete) */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg overflow-hidden z-50 divide-y">
          {suggestions.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => handleSelectSuggestion(product.title)}
              className="w-full flex items-center gap-3 p-2.5 text-left hover:bg-neutral-50 transition-colors"
            >
              <div className="relative h-10 w-10 rounded bg-neutral-100 overflow-hidden flex-shrink-0">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-800 truncate">
                  {product.title}
                </p>
                <p className="text-xs text-neutral-500">{product.category}</p>
              </div>
              <span className="text-sm font-semibold text-neutral-900">
                ${product.price.toFixed(2)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}