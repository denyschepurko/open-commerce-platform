import { categories } from "@/lib/repositories/mock/data/categories";
import type { CategoryRepository } from "../interfaces";

export const mockCategoryRepository: CategoryRepository = {
  async findAll() {
    return categories;
  },

  async findById(id: string) {
    return categories.find((c) => c.id === id) ?? null;
  },
};