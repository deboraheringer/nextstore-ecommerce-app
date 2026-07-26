import { getProducts, searchProducts } from "@/services/api";
import { ProductCard } from "@/components/product/product-card";

interface HomePageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q } = await searchParams;
  
  // Se houver busca na URL, chama searchProducts, senão traz os normais
  const data = q ? await searchProducts(q) : await getProducts(20, 0);

  return (
    <main className="min-h-screen bg-neutral-50/50 py-10">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            {q ? `Search Results for "${q}"` : "Featured Products"}
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            {q
              ? `Found ${data.total} ${data.total === 1 ? "product" : "products"}`
              : "Explore our curated selection of high-quality items."}
          </p>
        </header>

        {/* Exibe mensagem se nenhum produto for encontrado */}
        {data.products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border">
            <p className="text-lg font-medium text-neutral-700">No products found</p>
            <p className="text-sm text-neutral-500 mt-1">
              Try searching with a different term or keyword.
            </p>
          </div>
        ) : (
          /* Grade de Produtos */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}