import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
} from "@/services/api";
import { ProductCard } from "@/components/product/product-card";
import { CategorySidebar } from "@/components/layout/category-sidebar";

interface HomePageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q, category } = await searchParams;

  // Busca paralela para obter categorias e os produtos corretos
  const [categories, data] = await Promise.all([
    getCategories(),
    q
      ? searchProducts(q)
      : category
      ? getProductsByCategory(category)
      : getProducts(20, 0),
  ]);

  const formatCategoryName = (name: string) => {
    return name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <main className="min-h-screen bg-neutral-50/50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Cabecalho da Vitrine */}
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            {q
              ? `Search Results for "${q}"`
              : category
              ? formatCategoryName(category)
              : "Featured Products"}
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            {data.total} {data.total === 1 ? "product" : "products"} available
          </p>
        </header>

        {/* Layout de 2 Colunas: Sidebar + Product Grid */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Sidebar de Categorias (Esquerda) */}
          <CategorySidebar categories={categories} />

          {/* Grade de Produtos (Direita / Conteúdo Principal) */}
          <div className="flex-1 w-full">
            {data.products.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border">
                <p className="text-lg font-medium text-neutral-700">
                  No products found
                </p>
                <p className="text-sm text-neutral-500 mt-1">
                  Try selecting another category or clear your search query.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}