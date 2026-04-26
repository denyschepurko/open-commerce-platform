import type { Order } from "@/types/order";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/formatters";

export function OrderItemsTable({ order }: { order: Order }) {
  return (
    <Card className="mb-6">
      <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
        Items
      </h2>
      <div className="overflow-hidden">
        <div className="grid grid-cols-[1fr_100px_100px_100px] gap-4 px-4 py-2 bg-gray-50 rounded-t-lg border-b border-gray-100">
          <span className="text-xs font-medium text-gray-500 uppercase">
            Product
          </span>
          <span className="text-xs font-medium text-gray-500 uppercase text-center">
            Qty
          </span>
          <span className="text-xs font-medium text-gray-500 uppercase text-right">
            Price
          </span>
          <span className="text-xs font-medium text-gray-500 uppercase text-right">
            Subtotal
          </span>
        </div>
        {order.items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_100px_100px_100px] gap-4 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">
                {item.productName}
              </p>
              <p className="text-xs text-gray-500">SKU: {item.productSku}</p>
            </div>
            <span className="text-sm text-gray-600 text-center">
              {item.quantity}
            </span>
            <span className="text-sm text-gray-600 text-right">
              {formatCurrency(item.unitPrice)}
            </span>
            <span className="text-sm font-medium text-gray-900 text-right">
              {formatCurrency(item.subtotal)}
            </span>
          </div>
        ))}

        {/* Totals */}
        <div className="px-4 py-3 space-y-2">
          <div className="flex justify-end gap-8">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="text-sm text-gray-900 w-24 text-right">
              {formatCurrency(order.subtotal)}
            </span>
          </div>
          <div className="flex justify-end gap-8">
            <span className="text-sm text-gray-500">
              Discount{" "}
              {order.discountCode && (
                <span className="font-mono text-xs">
                  ({order.discountCode})
                </span>
              )}
            </span>
            <span className="text-sm text-green-600 w-24 text-right">
              {order.discountAmount
                ? `-${formatCurrency(order.discountAmount)}`
                : "$0.00"}
            </span>
          </div>
          <div className="flex justify-end gap-8">
            <span className="text-sm text-gray-500">Tax</span>
            <span className="text-sm text-gray-900 w-24 text-right">
              {formatCurrency(order.taxAmount ?? 0)}
            </span>
          </div>
          <div className="flex justify-end gap-8">
            <span className="text-sm text-gray-500">Shipping</span>
            <span className="text-sm text-gray-900 w-24 text-right">
              {order.shippingCost
                ? formatCurrency(order.shippingCost)
                : "Free"}
            </span>
          </div>
          <div className="flex justify-end gap-8 pt-2 border-t border-gray-200">
            <span className="text-sm font-semibold text-gray-900">Total</span>
            <span className="text-sm font-bold text-gray-900 w-24 text-right">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
