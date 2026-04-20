import { OrderStatus, PaymentStatus, ReturnStatus } from "@/types/enums";

const ORDER_COLORS: Record<OrderStatus, { label: string; color: string }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-800" },
  confirmed: { label: "Confirmed", color: "bg-teal-100 text-teal-800" },
  processing: { label: "Processing", color: "bg-yellow-100 text-yellow-800" },
  shipped: { label: "Shipped", color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800" },
  completed: { label: "Completed", color: "bg-gray-200 text-gray-700" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
};

const PAYMENT_COLORS: Record<PaymentStatus, { label: string; color: string }> =
  {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    paid: { label: "Paid", color: "bg-green-100 text-green-800" },
    failed: { label: "Failed", color: "bg-red-100 text-red-800" },
    partially_refunded: {
      label: "Partially refunded",
      color: "bg-orange-100 text-orange-800",
    },
    refunded: { label: "Refunded", color: "bg-gray-200 text-gray-700" },
  };

const RETURN_COLORS: Record<ReturnStatus, { label: string; color: string }> = {
  requested: { label: "Requested", color: "bg-blue-100 text-blue-800" },
  approved: { label: "Approved", color: "bg-yellow-100 text-yellow-800" },
  received: { label: "Received", color: "bg-green-100 text-green-800" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
};

type BadgeProps =
  | { type: "order"; status: OrderStatus }
  | { type: "payment"; status: PaymentStatus }
  | { type: "return"; status: ReturnStatus };

export function Badge(props: BadgeProps) {
  const config =
    props.type === "order"
      ? ORDER_COLORS[props.status]
      : props.type === "payment"
        ? PAYMENT_COLORS[props.status]
        : RETURN_COLORS[props.status];

  return (
    <span
      className={`px-2.5 py-1 text-xs font-medium rounded-full ${config.color}`}
    >
      {config.label}
    </span>
  );
}
