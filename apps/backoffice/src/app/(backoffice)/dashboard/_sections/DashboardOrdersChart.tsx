import {
  getOrdersByStatusData,
  getDashboardMetrics,
} from "@/lib/services/dashboardService";
import { OrdersByStatusChart } from "@/components/dashboard/OrdersByStatusChart";

export async function DashboardOrdersChart() {
  const [statusData, metrics] = await Promise.all([
    getOrdersByStatusData(),
    getDashboardMetrics(),
  ]);

  return <OrdersByStatusChart data={statusData} total={metrics.totalOrders} />;
}
