import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/services/orderService";
import { updateOrderAction } from "@/actions/orders";
import { OrderForm } from "@/components/orders/OrderForm";
import { ROUTES } from "@/lib/routes";

interface EditOrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditOrderPage({ params }: EditOrderPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href={ROUTES.ORDER_DETAIL(id)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to {order.orderNo}
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">
          Edit {order.orderNo}
        </h1>
      </div>
      <OrderForm action={updateOrderAction} order={order} />
    </div>
  );
}
