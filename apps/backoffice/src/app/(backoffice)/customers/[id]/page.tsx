import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCustomerById,
  getCustomerOrders,
} from "@/lib/services/customerService";
import { getCustomerFullName, getCustomerTier } from "@/types/customer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";
import { formatCurrency, formatDate } from "@/lib/formatters";

interface CustomerDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CustomerDetailPage({
  params,
}: CustomerDetailPageProps) {
  const { id } = await params;
  const customer = await getCustomerById(id);

  if (!customer) {
    notFound();
  }

  const orders = await getCustomerOrders(id);
  const fullName = getCustomerFullName(customer);
  const tier = getCustomerTier(customer.totalSpent);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <Link
            href={ROUTES.CUSTOMERS}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Customers
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">{fullName}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Customer since {formatDate(customer.createdAt)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button href={ROUTES.CUSTOMER_EDIT(customer.id)} variant="secondary">
            Edit
          </Button>
        </div>
      </div>

      {/* Tier badge */}
      <div className="flex gap-3 mb-6">
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full ${tier.color}`}
        >
          {tier.label}
        </span>
      </div>

      {/* Metric cards */}
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

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Contact info */}
        <Card>
          <h2 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Contact
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Email</span>
              <span className="text-sm text-gray-900">{customer.email}</span>
            </div>
            {customer.phone && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Phone</span>
                <span className="text-sm text-gray-900">{customer.phone}</span>
              </div>
            )}
            {customer.middleName && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Middle name</span>
                <span className="text-sm text-gray-900">
                  {customer.middleName}
                </span>
              </div>
            )}
          </div>
        </Card>

        {/* Addresses */}
        <div className="col-span-2">
          <Card>
            <h2 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
              Addresses ({customer.addresses.length})
            </h2>
            {customer.addresses.length === 0 ? (
              <p className="text-sm text-gray-500">No addresses on file</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {customer.addresses.map((addr, index) => (
                  <div
                    key={index}
                    className="border border-gray-100 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {addr.type}
                      </span>
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-900">{addr.addressLine1}</p>
                    {addr.addressLine2 && (
                      <p className="text-sm text-gray-700">
                        {addr.addressLine2}
                      </p>
                    )}
                    <p className="text-sm text-gray-700">
                      {addr.city}, {addr.state} {addr.zip}
                    </p>
                    <p className="text-sm text-gray-500">{addr.country}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Order history */}
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
    </div>
  );
}
