import { productRepository, categoryRepository } from "@/lib/repositories";
import type { Product, Category } from "@/types/product";
import type { QueryParams, PaginatedResult } from "@/lib/repositories/types";
import type { ProductFormData } from "@/lib/validations/product";

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

export async function createProduct(data: ProductFormData): Promise<Product> {
  const product: Product = {
    id: `prod-${Date.now()}`,
    name: data.name,
    sku: data.sku,
    description: data.description,
    price: data.price,
    costPrice: data.costPrice,
    categoryId: data.categoryId,
    stock: data.stock,
    lowStockThreshold: data.lowStockThreshold,
    isActive: data.isActive,
    media: [],
    createdAt: new Date().toISOString(),
  };
  return productRepository.create(product);
}

export async function updateProduct(id: string, data: ProductFormData): Promise<Product | null> {
  return productRepository.update(id, {
    name: data.name,
    sku: data.sku,
    description: data.description,
    price: data.price,
    costPrice: data.costPrice,
    categoryId: data.categoryId,
    stock: data.stock,
    lowStockThreshold: data.lowStockThreshold,
    isActive: data.isActive,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteProduct(id: string): Promise<boolean> {
  return productRepository.delete(id);
}