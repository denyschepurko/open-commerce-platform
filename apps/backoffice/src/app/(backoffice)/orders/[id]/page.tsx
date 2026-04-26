import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/services/orderService";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { OrderInfoCards } from "@/components/orders/OrderInfoCards";
import { OrderItemsTable } from "@/components/orders/OrderItemsTable";
import { OrderTimeline } from "@/components/orders/OrderTimeline";
import { ROUTES } from "@/lib/routes";
import { formatDateTime } from "@/lib/formatters";

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

      {/* Status badges */}
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

      <OrderInfoCards order={order} />
      <OrderItemsTable order={order} />
      <OrderTimeline events={order.events} />
    </div>
  );
}
