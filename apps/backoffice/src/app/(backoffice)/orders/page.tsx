import { getOrders } from "@/lib/services/orderService";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { ROUTES } from "@/lib/routes";

interface OrdersPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
    search?: string;
    status?: string;
  }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const params = await searchParams;

  const result = await getOrders({
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 10,
    sortBy: params.sortBy ?? "createdAt",
    sortOrder: (params.sortOrder as "asc" | "desc") ?? "desc",
    search: params.search,
    status: params.status,
  });

  return (
    <div>
      <PageHeader title="Orders">
        <Button href={ROUTES.ORDER_NEW}>New Order</Button>
      </PageHeader>

      <OrdersTable
        orders={result.data}
        total={result.total}
        page={result.page}
        limit={result.limit}
        totalPages={result.totalPages}
      />
    </div>
  );
}
