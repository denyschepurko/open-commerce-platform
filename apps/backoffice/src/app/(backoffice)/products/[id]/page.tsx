import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductWithCategory } from "@/lib/services/productService";
import { isLowStock } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { ProductImageCard } from "@/components/products/ProductImageCard";
import { ProductDetailsCard } from "@/components/products/ProductDetailsCard";
import { ProductPricingCard } from "@/components/products/ProductPricingCard";
import { ProductMediaGallery } from "@/components/products/ProductMediaGallery";
import { ROUTES } from "@/lib/routes";

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

      {/* Status badges */}
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
        <ProductImageCard product={product} />
        <ProductDetailsCard product={product} category={category} />
        <ProductPricingCard product={product} />
      </div>

      <ProductMediaGallery product={product} />
    </div>
  );
}
