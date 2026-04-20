import { getDashboardMetrics } from "@/lib/services/dashboardService";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { formatCurrencyWithCents } from "@/lib/formatters";

export async function DashboardMetrics() {
  const metrics = await getDashboardMetrics();

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      <MetricCard
        title="Total orders"
        value={metrics.totalOrders.toString()}
        color="default"
        trend={{ value: 12, label: "vs last month" }}
      />
      <MetricCard
        title="Revenue"
        value={formatCurrencyWithCents(metrics.totalRevenue)}
        color="green"
        trend={{ value: 8.5, label: "vs last month" }}
      />
      <MetricCard
        title="Pending"
        value={metrics.pendingOrders.toString()}
        color="yellow"
        subtitle={`${metrics.processingOrders} processing`}
      />
      <MetricCard
        title="Customers"
        value={metrics.totalCustomers.toString()}
        color="purple"
        trend={{ value: 5, label: "new this month" }}
      />
    </div>
  );
}
