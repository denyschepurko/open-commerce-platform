import type { QueryParams, PaginatedResult } from "./types";
import type { Order } from "@/types/order";
import type { Product } from "@/types/product";
import type { Category } from "@/types/product";
import type { Customer } from "@/types/customer";
import type { User } from "@/types/user";

export interface OrderRepository {
  findAll(params?: QueryParams): Promise<PaginatedResult<Order>>;
  findById(id: string): Promise<Order | null>;
  count(): Promise<number>;
  sumRevenue(): Promise<number>;
  countByStatus(): Promise<{ status: string; count: number }[]>;
  getTopSellingProducts(
    limit: number,
  ): Promise<
    { productId: string; name: string; quantity: number; revenue: number }[]
  >;
  getRevenueByPeriod(): Promise<{ label: string; revenue: number }[]>;
  findByCustomerId(customerId: string): Promise<Order[]>;
}

export interface ProductRepository {
  findAll(params?: QueryParams): Promise<PaginatedResult<Product>>;
  findById(id: string): Promise<Product | null>;
  findLowStock(): Promise<Product[]>;
}

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
}

export interface CustomerRepository {
  findAll(params?: QueryParams): Promise<PaginatedResult<Customer>>;
  findById(id: string): Promise<Customer | null>;
  count(): Promise<number>;
}

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
