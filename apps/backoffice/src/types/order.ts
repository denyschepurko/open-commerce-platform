import type {
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
  ReturnStatus,
} from "./enums";
import type { Address } from "./address";
import type { OrderEvent } from "./event";

export interface CustomerSnapshot {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productSku: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface Payment {
  method?: PaymentMethod;
  status?: PaymentStatus;
  transactionId?: string;
  amount?: number;
  currency?: string;
  refundedAmount?: number;
  failureReason?: string;
  paidAt?: string;
}

export interface ReturnItem {
  productId: string;
  productName: string;
  quantity: number;
  reason: string;
  refundAmount: number;
  status: ReturnStatus;
  requestedAt: string;
  resolvedAt?: string;
}

export interface Order {
  id: string;
  orderNo: string;
  customerId: string;
  createdBy: string;

  customerSnapshot: CustomerSnapshot;
  shippingAddress: Address;
  items: OrderItem[];
  payment: Payment;
  returns?: ReturnItem[];
  status: OrderStatus;

  events: OrderEvent[];

  subtotal: number;
  discountAmount?: number;
  discountCode?: string;
  taxAmount?: number;
  shippingCost?: number;
  total: number;

  createdAt: string;
  updatedAt: string;
}

export function getOrderCustomerName(order: Order): string {
  return `${order.customerSnapshot.firstName} ${order.customerSnapshot.lastName}`;
}

export function getOrderItemCount(order: Order): number {
  return order.items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getOrderRefundTotal(order: Order): number {
  if (!order.returns) return 0;
  return order.returns.reduce((sum, r) => sum + r.refundAmount, 0);
}
