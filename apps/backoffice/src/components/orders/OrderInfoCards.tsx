import Link from "next/link";
import type { Order } from "@/types/order";
import { getOrderCustomerName } from "@/types/order";
import { Card } from "@/components/ui/Card";
import { ROUTES } from "@/lib/routes";
import { PAYMENT_METHOD_LABELS } from "@/types/enums";
import { formatCurrency, formatDate } from "@/lib/formatters";

export function OrderInfoCards({ order }: { order: Order }) {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      {/* Customer info */}
      <Card>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
          Customer
        </h2>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-900">
            {getOrderCustomerName(order)}
          </p>
          <p className="text-sm text-gray-500">
            {order.customerSnapshot.email}
          </p>
          {order.customerSnapshot.phone && (
            <p className="text-sm text-gray-500">
              {order.customerSnapshot.phone}
            </p>
          )}
          <Link
            href={ROUTES.CUSTOMER_DETAIL(order.customerId)}
            className="text-sm text-blue-600 hover:underline block mt-2"
          >
            View customer profile
          </Link>
        </div>
      </Card>

      {/* Shipping address */}
      <Card>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
          Shipping address
        </h2>
        <div className="space-y-1">
          <p className="text-sm text-gray-700">
            {order.shippingAddress.addressLine1}
          </p>
          {order.shippingAddress.addressLine2 && (
            <p className="text-sm text-gray-700">
              {order.shippingAddress.addressLine2}
            </p>
          )}
          <p className="text-sm text-gray-700">
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.zip}
          </p>
          <p className="text-sm text-gray-700">
            {order.shippingAddress.country}
          </p>
        </div>
      </Card>

      {/* Payment info */}
      <Card>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
          Payment
        </h2>
        <div className="space-y-2">
          {order.payment.method && (
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Method</span>
              <span className="text-sm text-gray-900">
                {PAYMENT_METHOD_LABELS[order.payment.method]}
              </span>
            </div>
          )}
          {order.payment.transactionId && (
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Transaction</span>
              <span className="text-sm text-gray-900 font-mono">
                {order.payment.transactionId}
              </span>
            </div>
          )}
          {order.payment.paidAt && (
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Paid at</span>
              <span className="text-sm text-gray-900">
                {formatDate(order.payment.paidAt)}
              </span>
            </div>
          )}
          {order.payment.failureReason && (
            <p className="text-sm text-red-600 mt-2">
              {order.payment.failureReason}
            </p>
          )}
          {order.payment.refundedAmount &&
            order.payment.refundedAmount > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Refunded</span>
                <span className="text-sm text-red-600 font-medium">
                  -{formatCurrency(order.payment.refundedAmount)}
                </span>
              </div>
            )}
        </div>
      </Card>
    </div>
  );
}
