import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DashboardMetrics } from "./_sections/DashboardMetrics";
import { DashboardRevenueChart } from "./_sections/DashboardRevenueChart";
import { DashboardOrdersChart } from "./_sections/DashboardOrdersChart";
import { DashboardTopProducts } from "./_sections/DashboardTopProducts";
import { DashboardRecentOrders } from "./_sections/DashboardRecentOrders";
import { DashboardLowStock } from "./_sections/DashboardLowStock";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" />

      <Suspense>
        <DashboardMetrics />
      </Suspense>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2">
          <Suspense>
            <DashboardRevenueChart />
          </Suspense>
        </div>
        <Suspense>
          <DashboardOrdersChart />
        </Suspense>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <Suspense>
          <DashboardTopProducts />
        </Suspense>
        <Suspense>
          <DashboardRecentOrders />
        </Suspense>
      </div>

      <Suspense>
        <DashboardLowStock />
      </Suspense>
    </div>
  );
}
