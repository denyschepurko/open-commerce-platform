import { getProducts, getCategories } from "@/lib/services/productService";
import { ProductsTable } from "@/components/products/ProductsTable";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { ROUTES } from "@/lib/routes";

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
    search?: string;
    category?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const result = await getProducts({
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 10,
    sortBy: params.sortBy ?? "name",
    sortOrder: (params.sortOrder as "asc" | "desc") ?? "asc",
    search: params.search,
    category: params.category,
  });

  const categories = await getCategories();

  return (
    <div>
      <PageHeader title="Products">
        <Button href={ROUTES.PRODUCT_NEW}>Add Product</Button>
      </PageHeader>

      <ProductsTable
        products={result.data}
        categories={categories}
        total={result.total}
        page={result.page}
        limit={result.limit}
        totalPages={result.totalPages}
      />
    </div>
  );
}
