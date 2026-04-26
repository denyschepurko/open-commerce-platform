import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductWithCategory, getCategories } from "@/lib/services/productService";
import { updateProductAction } from "@/actions/products";
import { ProductForm } from "@/components/products/ProductForm";
import { ROUTES } from "@/lib/routes";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const [result, categories] = await Promise.all([
    getProductWithCategory(id),
    getCategories(),
  ]);

  if (!result) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href={ROUTES.PRODUCT_DETAIL(id)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to {result.product.name}
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">
          Edit {result.product.name}
        </h1>
      </div>
      <ProductForm
        action={updateProductAction}
        product={result.product}
        categories={categories}
      />
    </div>
  );
}
