import Link from "next/link";
import type { LowStockItem } from "@/lib/services/dashboardService";
import { ROUTES } from "@/lib/routes";

export function LowStockTable({ products }: { products: LowStockItem[] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Low stock alerts
          </h2>
          <p className="text-sm text-gray-500">
            {products.length} products need restocking
          </p>
        </div>
        <Link
          href={ROUTES.PRODUCTS}
          className="text-sm text-blue-600 hover:underline"
        >
          View all products
        </Link>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left text-xs font-medium text-gray-500 pb-2">
              Product
            </th>
            <th className="text-left text-xs font-medium text-gray-500 pb-2">
              SKU
            </th>
            <th className="text-left text-xs font-medium text-gray-500 pb-2">
              Category
            </th>
            <th className="text-right text-xs font-medium text-gray-500 pb-2">
              Stock
            </th>
            <th className="text-right text-xs font-medium text-gray-500 pb-2">
              Threshold
            </th>
            <th className="text-right text-xs font-medium text-gray-500 pb-2">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr
              key={item.product.id}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2.5 text-sm font-medium text-gray-900">
                {item.product.name}
              </td>
              <td className="py-2.5 text-sm text-gray-500">
                {item.product.sku}
              </td>
              <td className="py-2.5 text-sm text-gray-500">{item.category}</td>
              <td className="py-2.5 text-sm font-medium text-red-600 text-right">
                {item.product.stock}
              </td>
              <td className="py-2.5 text-sm text-gray-400 text-right">
                {item.product.lowStockThreshold}
              </td>
              <td className="py-2.5 text-right">
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${item.urgency === "critical" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
                >
                  {item.urgency === "critical" ? "Critical" : "Low"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
