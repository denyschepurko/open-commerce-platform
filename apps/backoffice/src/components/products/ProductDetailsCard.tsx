import type { Product, Category } from "@/types/product";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/formatters";

export function ProductDetailsCard({
  product,
  category,
}: {
  product: Product;
  category: Category | null;
}) {
  return (
    <Card>
      <h2 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
        Details
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Category</span>
          <span className="text-sm text-gray-900">
            {category?.name ?? "Unknown"}
          </span>
        </div>
        {product.description && (
          <div>
            <span className="text-sm text-gray-500">Description</span>
            <p className="text-sm text-gray-900 mt-1">
              {product.description}
            </p>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Created</span>
          <span className="text-sm text-gray-900">
            {formatDate(product.createdAt)}
          </span>
        </div>
        {product.updatedAt && (
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Updated</span>
            <span className="text-sm text-gray-900">
              {formatDate(product.updatedAt)}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
