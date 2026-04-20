import { getTopProducts } from "@/lib/services/dashboardService";
import { TopProductsChart } from "@/components/dashboard/TopProductsChart";

export async function DashboardTopProducts() {
  const data = await getTopProducts();

  return <TopProductsChart data={data} />;
}
