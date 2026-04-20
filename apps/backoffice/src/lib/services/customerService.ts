import { customerRepository, orderRepository } from "@/lib/repositories";
import type { Customer } from "@/types/customer";
import type { Order } from "@/types/order";
import type { QueryParams, PaginatedResult } from "@/lib/repositories/types";

export async function getCustomers(
  params?: QueryParams,
): Promise<PaginatedResult<Customer>> {
  return customerRepository.findAll(params);
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  return customerRepository.findById(id);
}

export async function getCustomerOrders(customerId: string): Promise<Order[]> {
  return orderRepository.findByCustomerId(customerId);
}
