import { getRevenueChartData } from "@/lib/services/dashboardService";
import { RevenueChart } from "@/components/dashboard/RevenueChart";

export async function DashboardRevenueChart() {
  const data = await getRevenueChartData();

  return <RevenueChart data={data} />;
}
