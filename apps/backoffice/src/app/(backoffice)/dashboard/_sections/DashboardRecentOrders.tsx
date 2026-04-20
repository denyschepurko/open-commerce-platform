import { getRecentOrders } from "@/lib/services/dashboardService";
import { RecentOrdersTable } from "@/components/dashboard/RecentOrdersTable";

export async function DashboardRecentOrders() {
  const orders = await getRecentOrders();

  return <RecentOrdersTable orders={orders} />;
}
