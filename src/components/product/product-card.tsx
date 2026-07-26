"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/product/${product.id}`} className="block relative aspect-square w-full bg-neutral-100 overflow-hidden">
        <CardHeader className="p-0 h-full">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover transition-transform hover:scale-105 duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Badge className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white">
            {product.category}
          </Badge>
        </CardHeader>
      </Link>
      
      <CardContent className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <p className="text-xs text-neutral-500 font-medium">{product.brand || "Generic"}</p>
          <Link href={`/product/${product.id}`}>
            <CardTitle className="text-base line-clamp-1 mt-1 hover:underline">{product.title}</CardTitle>
          </Link>
          <p className="text-xs text-neutral-600 line-clamp-2 mt-2">{product.description}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <span className="text-xs text-amber-600 font-semibold">★ {product.rating}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}