import { config } from "@/lib/config";
import { MediaType } from "./enums";

export interface ProductMedia {
  type: MediaType;
  url: string;
  altText?: string;
  sortOrder: number;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  costPrice?: number;
  categoryId: string;
  stock: number;
  lowStockThreshold?: number;
  isActive: boolean;
  media: ProductMedia[];
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
  isActive?: boolean;
}

export function getPrimaryImageUrl(product: Product): string | undefined {
  const primary = product.media.find((m) => m.isPrimary && m.type === "image");
  if (primary) return primary.url;
  return product.media.find((m) => m.type === "image")?.url;
}

export function isLowStock(product: Product): boolean {
  const threshold =
    product.lowStockThreshold ?? config.defaultLowStockThreshold;
  return product.stock <= threshold;
}

export function getProfitMargin(product: Product): number | null {
  if (!product.costPrice) return null;
  return ((product.price - product.costPrice) / product.price) * 100;
}
