import Link from "next/link";
import type { Order } from "@/types/order";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ROUTES } from "@/lib/routes";
import { formatCurrency, formatDate } from "@/lib/formatters";

export function CustomerOrderHistory({ orders }: { orders: Order[] }) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          Order history ({orders.length})
        </h2>
      </div>
      {orders.length === 0 ? (
        <p className="text-sm text-gray-500">No orders yet</p>
      ) : (
        <div className="overflow-hidden">
          <div className="grid grid-cols-[120px_1fr_120px_130px_100px_110px] gap-4 px-4 py-2 bg-gray-50 rounded-t-lg border-b border-gray-100">
            <span className="text-xs font-medium text-gray-500 uppercase">
              Order
            </span>
            <span className="text-xs font-medium text-gray-500 uppercase">
              Items
            </span>
            <span className="text-xs font-medium text-gray-500 uppercase">
              Status
            </span>
            <span className="text-xs font-medium text-gray-500 uppercase">
              Payment
            </span>
            <span className="text-xs font-medium text-gray-500 uppercase text-right">
              Total
            </span>
            <span className="text-xs font-medium text-gray-500 uppercase">
              Date
            </span>
          </div>
          {orders.map((order) => (
            <Link
              key={order.id}
              href={ROUTES.ORDER_DETAIL(order.id)}
              className="grid grid-cols-[120px_1fr_120px_130px_100px_110px] gap-4 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-blue-600">
                {order.orderNo}
              </span>
              <span className="text-sm text-gray-600 truncate">
                {order.items.map((i) => i.productName).join(", ")}
              </span>
              <span className="flex items-center">
                <Badge type="order" status={order.status} />
              </span>
              <span className="flex items-center">
                {order.payment.status && (
                  <Badge type="payment" status={order.payment.status} />
                )}
              </span>
              <span className="text-sm font-medium text-gray-900 text-right">
                {formatCurrency(order.total)}
              </span>
              <span className="text-sm text-gray-500">
                {formatDate(order.createdAt)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </Card>
  );
}
