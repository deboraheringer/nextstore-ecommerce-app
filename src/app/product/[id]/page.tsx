import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Truck, ShieldCheck } from "lucide-react";
import { getProductById } from "@/services/api";
import { ProductGallery } from "@/components/product/product-gallery";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { Badge } from "@/components/ui/badge";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  let product;
  try {
    product = await getProductById(productId);
  } catch (error) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-50/50 py-10">
      <div className="container mx-auto px-4">
        
        {/* Link de Retorno */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>

        {/* Layout de Duas Colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 md:p-8 rounded-xl border">
          
          {/* Galeria de Fotos (Coluna Esquerda) */}
          <ProductGallery images={product.images} title={product.title} />

          {/* Detalhes do Produto (Coluna Direita) */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2">
                <Badge variant="outline" className="uppercase tracking-wider text-xs">
                  {product.category}
                </Badge>
                <span className="text-xs text-neutral-500 font-medium">
                  {product.brand ? `Brand: ${product.brand}` : "Generic"}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mt-3">
                {product.title}
              </h1>

              {/* Avaliação & Preço */}
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-amber-500 font-semibold text-sm">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-neutral-300">|</span>
                <span className="text-xs text-emerald-600 font-semibold">
                  In Stock ({product.stock} units)
                </span>
              </div>

              <div className="mt-6">
                <span className="text-3xl font-extrabold text-neutral-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="ml-3 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              <p className="mt-6 text-sm text-neutral-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Ações e Selos de Confiança */}
            <div className="space-y-6 pt-6 border-t">
              <AddToCartButton product={product} />

              <div className="grid grid-cols-2 gap-4 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-neutral-500" />
                  <span>Free Express Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-neutral-500" />
                  <span>2 Year Warranty</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}