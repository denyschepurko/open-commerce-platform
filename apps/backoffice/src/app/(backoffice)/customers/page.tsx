import { CustomersTable } from "@/components/customers/CustomersTable";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCustomers } from "@/lib/services/customerService";
import { ROUTES } from "@/lib/routes";

interface CustomersPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
    search?: string;
  }>;
}

export default async function CustomersPage({
  searchParams,
}: CustomersPageProps) {
  const params = await searchParams;

  const result = await getCustomers({
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 10,
    sortBy: params.sortBy ?? "totalSpent",
    sortOrder: (params.sortOrder as "asc" | "desc") ?? "desc",
    search: params.search,
  });

  return (
    <div>
      <PageHeader title="Customers">
        <Button href={ROUTES.CUSTOMER_NEW}>Add Customer</Button>
      </PageHeader>

      <CustomersTable
        customers={result.data}
        total={result.total}
        page={result.page}
        limit={result.limit}
        totalPages={result.totalPages}
      />
    </div>
  );
}
