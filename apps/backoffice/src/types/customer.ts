import type { Address } from "./address";

export interface Customer {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone?: string;
  addresses: Address[];
  totalOrders: number;
  totalSpent: number;
  lifetimeValue: number;
  lastOrderAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CustomerTier {
  label: string;
  color: string;
}

const TIER_THRESHOLDS = [
  { min: 10000, label: "VIP", color: "bg-purple-100 text-purple-800" },
  { min: 5000, label: "Gold", color: "bg-yellow-100 text-yellow-800" },
  { min: 1000, label: "Silver", color: "bg-gray-200 text-gray-700" },
  { min: 1, label: "Bronze", color: "bg-orange-100 text-orange-800" },
  { min: 0, label: "New", color: "bg-blue-100 text-blue-800" },
] as const;

export function getCustomerFullName(
  customer: Pick<Customer, "firstName" | "middleName" | "lastName">,
): string {
  if (customer.middleName) {
    return `${customer.firstName} ${customer.middleName} ${customer.lastName}`;
  }
  return `${customer.firstName} ${customer.lastName}`;
}

export function getDefaultShippingAddress(
  customer: Customer,
): Address | undefined {
  return (
    customer.addresses.find((a) => a.type === "shipping" && a.isDefault) ||
    customer.addresses.find((a) => a.type === "shipping")
  );
}

export function getCustomerTier(totalSpent: number): CustomerTier {
  const tier = TIER_THRESHOLDS.find((t) => totalSpent >= t.min);
  return tier ?? { label: "New", color: "bg-blue-100 text-blue-800" };
}
