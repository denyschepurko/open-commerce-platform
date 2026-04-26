import { customerRepository, orderRepository } from "@/lib/repositories";
import type { Customer } from "@/types/customer";
import type { Order } from "@/types/order";
import type { QueryParams, PaginatedResult } from "@/lib/repositories/types";
import type { CustomerFormData } from "@/lib/validations/customer";

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

export async function createCustomer(data: CustomerFormData): Promise<Customer> {
  const customer: Customer = {
    id: `cust-${Date.now()}`,
    firstName: data.firstName,
    middleName: data.middleName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    addresses: [
      {
        type: "shipping",
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
        isDefault: true,
      },
    ],
    totalOrders: 0,
    totalSpent: 0,
    lifetimeValue: 0,
    createdAt: new Date().toISOString(),
  };
  return customerRepository.create(customer);
}

export async function updateCustomer(id: string, data: CustomerFormData): Promise<Customer | null> {
  const existing = await customerRepository.findById(id);
  if (!existing) return null;

  const updatedAddresses = [...existing.addresses];
  const defaultIdx = updatedAddresses.findIndex((a) => a.type === "shipping" && a.isDefault);
  const newAddr = {
    type: "shipping" as const,
    addressLine1: data.addressLine1,
    addressLine2: data.addressLine2,
    city: data.city,
    state: data.state,
    zip: data.zip,
    country: data.country,
    isDefault: true,
  };
  if (defaultIdx >= 0) {
    updatedAddresses[defaultIdx] = newAddr;
  } else {
    updatedAddresses.push(newAddr);
  }

  return customerRepository.update(id, {
    firstName: data.firstName,
    middleName: data.middleName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    addresses: updatedAddresses,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteCustomer(id: string): Promise<boolean> {
  return customerRepository.delete(id);
}
