import { productRepository, categoryRepository } from "@/lib/repositories";
import type { Product, Category } from "@/types/product";
import type { QueryParams, PaginatedResult } from "@/lib/repositories/types";

export async function getProducts(params?: QueryParams): Promise<PaginatedResult<Product>> {
  return productRepository.findAll(params);
}

export async function getProductById(id: string): Promise<Product | null> {
  return productRepository.findById(id);
}

export async function getCategories(): Promise<Category[]> {
  return categoryRepository.findAll();
}

export async function getProductWithCategory(id: string): Promise<{ product: Product; category: Category | null } | null> {
  const product = await productRepository.findById(id);
  if (!product) return null;

  const categories = await categoryRepository.findAll();
  const category = categories.find((c) => c.id === product.categoryId) ?? null;

  return { product, category };
}