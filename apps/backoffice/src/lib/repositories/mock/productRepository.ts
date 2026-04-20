import type { ProductRepository } from "../interfaces";
import type { QueryParams, PaginatedResult } from "../types";
import { isLowStock, type Product } from "@/types/product";
import { products } from "@/lib/repositories/mock/data/products";

export const mockProductRepository: ProductRepository = {
  async findAll(params?: QueryParams): Promise<PaginatedResult<Product>> {
    let filtered = [...products];

    if (params?.status === "active") {
      filtered = filtered.filter((p) => p.isActive);
    } else if (params?.status === "inactive") {
      filtered = filtered.filter((p) => !p.isActive);
    }

    if (params?.category) {
      filtered = filtered.filter((p) => p.categoryId === params.category);
    }

    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.sku.toLowerCase().includes(s) ||
          (p.description?.toLowerCase().includes(s) ?? false),
      );
    }

    const sortBy = params?.sortBy ?? "name";
    const sortOrder = params?.sortOrder ?? "asc";

    filtered.sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;

      switch (sortBy) {
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case "sku":
          aVal = a.sku.toLowerCase();
          bVal = b.sku.toLowerCase();
          break;
        case "price":
          aVal = a.price;
          bVal = b.price;
          break;
        case "stock":
          aVal = a.stock;
          bVal = b.stock;
          break;
        case "createdAt":
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
          break;
        default:
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    const total = filtered.length;
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const start = (page - 1) * limit;

    return {
      data: filtered.slice(start, start + limit),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  async findById(id: string) {
    return products.find((p) => p.id === id) ?? null;
  },

  async findLowStock() {
    return products.filter(isLowStock).sort((a, b) => a.stock - b.stock);
  },
};
