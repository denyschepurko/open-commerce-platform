import Link from "next/link";
import { getCategories } from "@/lib/services/productService";
import { createProductAction } from "@/actions/products";
import { ProductForm } from "@/components/products/ProductForm";
import { ROUTES } from "@/lib/routes";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="mb-6">
        <Link
          href={ROUTES.PRODUCTS}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">New Product</h1>
      </div>
      <ProductForm action={createProductAction} categories={categories} />
    </div>
  );
}
