import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductWithCategory } from "@/lib/services/productService";
import {
  isLowStock,
  getProfitMargin,
  getPrimaryImageUrl,
} from "@/types/product";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";
import { config } from "@/lib/config";
import { formatCurrency, formatDate, formatPercent } from "@/lib/formatters";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const result = await getProductWithCategory(id);

  if (!result) {
    notFound();
  }

  const { product, category } = result;
  const primaryImage = getPrimaryImageUrl(product);
  const margin = getProfitMargin(product);
  const lowStock = isLowStock(product);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <Link
            href={ROUTES.PRODUCTS}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Products
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">
            {product.name}
          </h1>
          <p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>
        </div>
        <div className="flex gap-2">
          <Button href={ROUTES.PRODUCT_EDIT(product.id)} variant="secondary">
            Edit
          </Button>
          <Button variant="danger">
            {product.isActive ? "Deactivate" : "Activate"}
          </Button>
        </div>
      </div>

      {/* Status row */}
      <div className="flex gap-3 mb-6">
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full ${
            product.isActive
              ? "bg-green-100 text-green-800"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {product.isActive ? "Active" : "Inactive"}
        </span>
        {lowStock && (
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            Low Stock
          </span>
        )}
        {category && (
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {category.name}
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Product image */}
        <Card>
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg bg-gray-100"
            />
          ) : (
            <div className="w-full h-48 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
              No image available
            </div>
          )}
          {product.media.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.media.slice(0, 4).map((m, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden"
                >
                  {m.type === "image" ? (
                    <img
                      src={m.url}
                      alt={m.altText ?? ""}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      {m.type}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Product details */}
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

        {/* Pricing + Stock */}
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
      </div>

      {/* Media gallery */}
      {product.media.length > 0 && (
        <Card>
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Media ({product.media.length} files)
          </h2>
          <div className="grid grid-cols-6 gap-3">
            {product.media.map((m, i) => (
              <div key={i} className="relative group">
                {m.type === "image" ? (
                  <img
                    src={m.url}
                    alt={m.altText ?? product.name}
                    className="w-full h-24 object-cover rounded-lg bg-gray-100"
                  />
                ) : (
                  <div className="w-full h-24 rounded-lg bg-gray-100 flex flex-col items-center justify-center">
                    <span className="text-xs text-gray-500 uppercase">
                      {m.type}
                    </span>
                  </div>
                )}
                {m.isPrimary && (
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded font-medium">
                    Primary
                  </span>
                )}
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {m.altText ?? `${m.type} ${i + 1}`}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
