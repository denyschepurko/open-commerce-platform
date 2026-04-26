import Link from "next/link";
import { getCustomers } from "@/lib/services/customerService";
import { getProducts } from "@/lib/services/productService";
import { createOrderAction } from "@/actions/orders";
import { OrderCreateForm } from "@/components/orders/OrderCreateForm";
import { ROUTES } from "@/lib/routes";

export default async function NewOrderPage() {
  const [customersResult, productsResult] = await Promise.all([
    getCustomers({ limit: 100 }),
    getProducts({ limit: 100 }),
  ]);

  return (
    <div>
      <div className="mb-6">
        <Link
          href={ROUTES.ORDERS}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to Orders
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">New Order</h1>
      </div>
      <OrderCreateForm
        action={createOrderAction}
        customers={customersResult.data}
        products={productsResult.data}
      />
    </div>
  );
}
