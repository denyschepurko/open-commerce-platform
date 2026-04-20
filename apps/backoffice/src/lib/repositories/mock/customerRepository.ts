import type { CustomerRepository } from "../interfaces";
import type { QueryParams, PaginatedResult } from "../types";
import type { Customer } from "@/types/customer";
import { customers } from "@/lib/repositories/mock/data/customers";
import { getCustomerFullName } from "@/types/customer";

export const mockCustomerRepository: CustomerRepository = {
  async findAll(params?: QueryParams): Promise<PaginatedResult<Customer>> {
    let filtered = [...customers];

    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          getCustomerFullName(c).toLowerCase().includes(s) ||
          c.email.toLowerCase().includes(s) ||
          (c.phone?.toLowerCase().includes(s) ?? false),
      );
    }

    const sortBy = params?.sortBy ?? "totalSpent";
    const sortOrder = params?.sortOrder ?? "desc";

    filtered.sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;

      switch (sortBy) {
        case "name":
          aVal = getCustomerFullName(a).toLowerCase();
          bVal = getCustomerFullName(b).toLowerCase();
          break;
        case "totalOrders":
          aVal = a.totalOrders;
          bVal = b.totalOrders;
          break;
        case "totalSpent":
          aVal = a.totalSpent;
          bVal = b.totalSpent;
          break;
        case "lifetimeValue":
          aVal = a.lifetimeValue;
          bVal = b.lifetimeValue;
          break;
        case "createdAt":
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
          break;
        default:
          aVal = a.totalSpent;
          bVal = b.totalSpent;
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
    return customers.find((c) => c.id === id) ?? null;
  },

  async count() {
    return customers.length;
  },
};
