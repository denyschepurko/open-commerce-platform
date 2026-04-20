export type OrderStatus =
  | "new"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "completed"
  | "cancelled";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "partially_refunded"
  | "refunded";

export type PaymentMethod = "credit_card" | "paypal" | "bank_transfer";

export type UserRole = "admin" | "manager" | "support";

export type AddressType = "shipping" | "billing";

export type MediaType = "image" | "video" | "document";

export type ReturnStatus = "requested" | "approved" | "received" | "rejected";

export const ORDER_STATUSES: OrderStatus[] = [
  "new",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "completed",
  "cancelled",
];

export const PAYMENT_STATUSES: PaymentStatus[] = [
  "pending",
  "paid",
  "failed",
  "partially_refunded",
  "refunded",
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  "credit_card",
  "paypal",
  "bank_transfer",
];

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  credit_card: "Credit Card",
  bank_transfer: "Bank Transfer",
  paypal: "PayPal",
};

export const USER_ROLES: UserRole[] = ["admin", "manager", "support"];

export const RETURN_STATUSES: ReturnStatus[] = [
  "requested",
  "approved",
  "received",
  "rejected",
];
