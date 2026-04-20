import { getLowStockProducts } from "@/lib/services/dashboardService";
import { LowStockTable } from "@/components/dashboard/LowStockTable";

export async function DashboardLowStock() {
  const products = await getLowStockProducts();

  if (products.length === 0) {
    return null;
  }

  return <LowStockTable products={products} />;
}
