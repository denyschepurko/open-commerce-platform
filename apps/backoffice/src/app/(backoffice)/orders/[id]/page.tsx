import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/services/orderService";
import { getOrderCustomerName } from "@/types/order";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { OrderTimeline } from "@/components/orders/OrderTimeline";
import { ROUTES } from "@/lib/routes";
import { PAYMENT_METHOD_LABELS } from "@/types/enums";
import { formatCurrency, formatDateTime, formatDate } from "@/lib/formatters";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">
            {order.orderNo}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Created {formatDateTime(order.createdAt)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button href={ROUTES.ORDER_EDIT(order.id)} variant="secondary">
            Edit
          </Button>
          <Button variant="danger">Cancel Order</Button>
        </div>
      </div>

      {/* Status badges row */}
      <div className="flex gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Order:</span>
          <Badge type="order" status={order.status} />
        </div>
        {order.payment.status && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Payment:</span>
            <Badge type="payment" status={order.payment.status} />
          </div>
        )}
      </div>

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

      {/* Order items */}
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

      {/* Activity log — full width */}
      <OrderTimeline events={order.events} />
    </div>
  );
}
