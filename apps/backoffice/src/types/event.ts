import type { OrderStatus, PaymentMethod } from "./enums";
import type { Address } from "./address";
import { formatCurrency } from "@/lib/formatters";

export type OrderEventType =
  | "order_created"
  | "status_changed"
  | "payment_received"
  | "payment_failed"
  | "refund_processed"
  | "return_requested"
  | "return_approved"
  | "return_received"
  | "return_rejected"
  | "address_changed"
  | "note_added"
  | "discount_applied"
  | "item_added"
  | "item_removed";

export type OrderEvent =
  | {
      type: "order_created";
      timestamp: string;
      userId: string;
      data: { status: OrderStatus };
    }
  | {
      type: "status_changed";
      timestamp: string;
      userId: string;
      data: { from: OrderStatus; to: OrderStatus; note?: string };
    }
  | {
      type: "payment_received";
      timestamp: string;
      userId: string;
      data: {
        method: PaymentMethod;
        amount: number;
        transactionId: string;
        currency: string;
      };
    }
  | {
      type: "payment_failed";
      timestamp: string;
      userId: string;
      data: { method: PaymentMethod; amount: number; reason: string };
    }
  | {
      type: "refund_processed";
      timestamp: string;
      userId: string;
      data: { amount: number; reason: string };
    }
  | {
      type: "return_requested";
      timestamp: string;
      userId: string;
      data: {
        productId: string;
        productName: string;
        quantity: number;
        reason: string;
      };
    }
  | {
      type: "return_approved";
      timestamp: string;
      userId: string;
      data: { productId: string; productName: string };
    }
  | {
      type: "return_received";
      timestamp: string;
      userId: string;
      data: { productId: string; productName: string; refundAmount: number };
    }
  | {
      type: "return_rejected";
      timestamp: string;
      userId: string;
      data: { productId: string; productName: string; reason: string };
    }
  | {
      type: "address_changed";
      timestamp: string;
      userId: string;
      data: { from: Address; to: Address };
    }
  | {
      type: "note_added";
      timestamp: string;
      userId: string;
      data: { note: string };
    }
  | {
      type: "discount_applied";
      timestamp: string;
      userId: string;
      data: { code: string; amount: number };
    }
  | {
      type: "item_added";
      timestamp: string;
      userId: string;
      data: {
        productId: string;
        productName: string;
        quantity: number;
        unitPrice: number;
      };
    }
  | {
      type: "item_removed";
      timestamp: string;
      userId: string;
      data: { productId: string; productName: string; quantity: number };
    };

export const EVENT_CONFIG: Record<
  OrderEventType,
  { icon: string; color: string }
> = {
  order_created: { icon: "●", color: "blue" },
  status_changed: { icon: "●", color: "blue" },
  payment_received: { icon: "●", color: "green" },
  payment_failed: { icon: "●", color: "red" },
  refund_processed: { icon: "●", color: "red" },
  return_requested: { icon: "●", color: "yellow" },
  return_approved: { icon: "●", color: "yellow" },
  return_received: { icon: "●", color: "green" },
  return_rejected: { icon: "●", color: "red" },
  address_changed: { icon: "●", color: "purple" },
  note_added: { icon: "●", color: "gray" },
  discount_applied: { icon: "●", color: "green" },
  item_added: { icon: "●", color: "blue" },
  item_removed: { icon: "●", color: "red" },
};

export function getEventTitle(event: OrderEvent): string {
  switch (event.type) {
    case "order_created":
      return `Order created (${event.data.status})`;
    case "status_changed":
      return `${event.data.from} → ${event.data.to}`;
    case "payment_received":
      return `Payment received — ${event.data.method.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}`;
    case "payment_failed":
      return "Payment failed";
    case "refund_processed":
      return `Refund processed — ${formatCurrency(event.data.amount)}`;
    case "return_requested":
      return `Return requested — ${event.data.productName}`;
    case "return_approved":
      return `Return approved — ${event.data.productName}`;
    case "return_received":
      return `Return received — ${event.data.productName}`;
    case "return_rejected":
      return `Return rejected — ${event.data.productName}`;
    case "address_changed":
      return "Shipping address updated";
    case "note_added":
      return "Note added";
    case "discount_applied":
      return `Discount applied — ${event.data.code}`;
    case "item_added":
      return `Item added — ${event.data.productName}`;
    case "item_removed":
      return `Item removed — ${event.data.productName}`;
  }
}

export function getEventDescription(event: OrderEvent): string | undefined {
  switch (event.type) {
    case "status_changed":
      return event.data.note;
    case "payment_received":
      return `Transaction: ${event.data.transactionId} — ${formatCurrency(event.data.amount)} ${event.data.currency}`;
    case "payment_failed":
      return event.data.reason;
    case "refund_processed":
      return event.data.reason;
    case "return_requested":
      return `Qty: ${event.data.quantity} — ${event.data.reason}`;
    case "return_received":
      return `Refund: ${formatCurrency(event.data.refundAmount)}`;
    case "return_rejected":
      return event.data.reason;
    case "note_added":
      return event.data.note;
    case "discount_applied":
      return `-${formatCurrency(event.data.amount)}`;
    case "item_added":
      return `${event.data.quantity} × ${formatCurrency(event.data.unitPrice)}`;
    case "item_removed":
      return `Qty: ${event.data.quantity}`;
    default:
      return undefined;
  }
}
