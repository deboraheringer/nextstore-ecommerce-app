import { Product, ProductsResponse } from "@/types/product";

const BASE_URL = "https://dummyjson.com";

export async function getProducts(limit = 20, skip = 0): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function searchProducts(query: string): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error(`Failed to search products with query: ${query}`);
  }

  return response.json();
}

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id ${id}`);
  }

  return response.json();
}

// 📌 Buscar todas as categorias disponíveis
export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/products/category-list`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

// 📌 Buscar produtos por categoria específica
export async function getProductsByCategory(category: string): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products for category: ${category}`);
  }

  return response.json();
}