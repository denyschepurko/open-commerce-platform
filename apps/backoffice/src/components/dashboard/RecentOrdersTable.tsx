import Link from "next/link";
import type { Order } from "@/types/order";
import { getOrderCustomerName } from "@/types/order";
import { Badge } from "@/components/ui/Badge";
import { ROUTES } from "@/lib/routes";
import { formatCurrency } from "@/lib/formatters";

export function RecentOrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent orders</h2>
        <Link
          href={ROUTES.ORDERS}
          className="text-sm text-blue-600 hover:underline"
        >
          View all
        </Link>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left text-xs font-medium text-gray-500 pb-2">
              Order
            </th>
            <th className="text-left text-xs font-medium text-gray-500 pb-2">
              Customer
            </th>
            <th className="text-left text-xs font-medium text-gray-500 pb-2">
              Status
            </th>
            <th className="text-right text-xs font-medium text-gray-500 pb-2">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2.5">
                <Link
                  href={ROUTES.ORDER_DETAIL(order.id)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {order.orderNo}
                </Link>
              </td>
              <td className="py-2.5 text-sm text-gray-700">
                {getOrderCustomerName(order)}
              </td>
              <td className="py-2.5">
                <Badge type="order" status={order.status} />
              </td>
              <td className="py-2.5 text-sm text-gray-900 text-right">
                {formatCurrency(order.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
