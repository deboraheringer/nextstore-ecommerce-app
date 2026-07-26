import { getProducts } from "@/services/api";
import { ProductCard } from "@/components/product/product-card";

export default async function HomePage() {
  // Buscamos os primeiros 20 produtos direto no Server Component
  const data = await getProducts(20, 0);

  return (
    <main className="min-h-screen bg-neutral-50/50 py-10">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Featured Products
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Explore our curated selection of high-quality items.
          </p>
        </header>

        {/* Grade Responsiva de Produtos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}