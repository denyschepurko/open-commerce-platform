import type { Customer } from "@/types/customer";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatDate } from "@/lib/formatters";

export function CustomerMetrics({ customer }: { customer: Customer }) {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      <Card>
        <p className="text-sm text-gray-500">Total orders</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {customer.totalOrders}
        </p>
      </Card>
      <Card>
        <p className="text-sm text-gray-500">Total spent</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {formatCurrency(customer.totalSpent)}
        </p>
      </Card>
      <Card>
        <p className="text-sm text-gray-500">Lifetime value</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {formatCurrency(customer.lifetimeValue)}
        </p>
      </Card>
      <Card>
        <p className="text-sm text-gray-500">Last order</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {customer.lastOrderAt
            ? formatDate(customer.lastOrderAt)
            : "Never"}
        </p>
      </Card>
    </div>
  );
}
