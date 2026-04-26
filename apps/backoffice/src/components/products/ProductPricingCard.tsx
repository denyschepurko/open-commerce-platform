import type { Product } from "@/types/product";
import { getProfitMargin, isLowStock } from "@/types/product";
import { Card } from "@/components/ui/Card";
import { config } from "@/lib/config";
import { formatCurrency, formatPercent } from "@/lib/formatters";

export function ProductPricingCard({ product }: { product: Product }) {
  const margin = getProfitMargin(product);
  const lowStock = isLowStock(product);

  return (
    <Card>
      <h2 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
        Pricing & Inventory
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Selling price</span>
          <span className="text-sm font-semibold text-gray-900">
            {formatCurrency(product.price)}
          </span>
        </div>
        {product.costPrice !== undefined && (
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Cost price</span>
            <span className="text-sm text-gray-900">
              {formatCurrency(product.costPrice)}
            </span>
          </div>
        )}
        {margin !== null && (
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Profit margin</span>
            <span
              className={`text-sm font-medium ${margin >= 30 ? "text-green-600" : margin >= 15 ? "text-yellow-600" : "text-red-600"}`}
            >
              {formatPercent(margin)}
            </span>
          </div>
        )}
        <div className="border-t border-gray-100 pt-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Stock</span>
            <span
              className={`text-sm font-semibold ${lowStock ? "text-red-600" : "text-gray-900"}`}
            >
              {product.stock} units
            </span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-500">
              Low stock threshold
            </span>
            <span className="text-sm text-gray-900">
              {product.lowStockThreshold ?? config.defaultLowStockThreshold}{" "}
              units
            </span>
          </div>
          {lowStock && (
            <div className="mt-3 p-2 bg-red-50 rounded-lg">
              <p className="text-xs text-red-700 font-medium">
                Stock is below threshold — reorder needed
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
