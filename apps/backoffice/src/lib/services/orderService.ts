import { orderRepository } from "@/lib/repositories";
import type { Order } from "@/types/order";
import type { QueryParams, PaginatedResult } from "@/lib/repositories/types";

export async function getOrders(
  params?: QueryParams,
): Promise<PaginatedResult<Order>> {
  return orderRepository.findAll(params);
}

export async function getOrderById(id: string): Promise<Order | null> {
  return orderRepository.findById(id);
}
