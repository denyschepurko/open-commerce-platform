import {
  orderRepository,
  productRepository,
  customerRepository,
  categoryRepository,
} from "@/lib/repositories";
import type { Order } from "@/types/order";
import type { Product } from "@/types/product";
import { config } from "../config";

export interface DashboardMetrics {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  processingOrders: number;
  totalCustomers: number;
}

export interface StatusCount {
  name: string;
  count: number;
  color: string;
}

export interface TopProduct {
  productId: string;
  name: string;
  quantity: number;
  revenue: number;
}

export interface RevenuePeriod {
  label: string;
  revenue: number;
}

export interface LowStockItem {
  product: Product;
  category: string;
  urgency: "critical" | "low";
}

const STATUS_CHART_COLORS: Record<string, { label: string; color: string }> = {
  new: { label: "New", color: "#3b82f6" },
  confirmed: { label: "Confirmed", color: "#14b8a6" },
  processing: { label: "Processing", color: "#eab308" },
  shipped: { label: "Shipped", color: "#a855f7" },
  delivered: { label: "Delivered", color: "#22c55e" },
  completed: { label: "Completed", color: "#6b7280" },
  cancelled: { label: "Cancelled", color: "#ef4444" },
};

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const totalOrders = await orderRepository.count();
  const totalRevenue = await orderRepository.sumRevenue();
  const totalCustomers = await customerRepository.count();
  const statusCounts = await orderRepository.countByStatus();

  const pendingOrders = statusCounts
    .filter((s) => s.status === "new" || s.status === "confirmed")
    .reduce((sum, s) => sum + s.count, 0);

  const processingOrders =
    statusCounts.find((s) => s.status === "processing")?.count ?? 0;

  return {
    totalOrders,
    totalRevenue,
    pendingOrders,
    processingOrders,
    totalCustomers,
  };
}

export async function getOrdersByStatusData(): Promise<StatusCount[]> {
  const statusCounts = await orderRepository.countByStatus();

  return statusCounts
    .map((s) => ({
      name: STATUS_CHART_COLORS[s.status]?.label ?? s.status,
      count: s.count,
      color: STATUS_CHART_COLORS[s.status]?.color ?? "#6b7280",
    }))
    .filter((d) => d.count > 0);
}

export async function getTopProducts(): Promise<TopProduct[]> {
  return orderRepository.getTopSellingProducts(5);
}

export async function getRevenueChartData(): Promise<RevenuePeriod[]> {
  return orderRepository.getRevenueByPeriod();
}

export async function getRecentOrders(): Promise<Order[]> {
  const { data } = await orderRepository.findAll({
    sortBy: "createdAt",
    sortOrder: "desc",
    limit: 5,
  });
  return data;
}

export async function getLowStockProducts(): Promise<LowStockItem[]> {
  const products = await productRepository.findLowStock();
  const categories = await categoryRepository.findAll();

  return products.map((product) => {
    const category = categories.find((c) => c.id === product.categoryId);
    const ratio =
      product.stock /
      (product.lowStockThreshold ?? config.defaultLowStockThreshold);

    return {
      product,
      category: category?.name ?? "Unknown",
      urgency: ratio <= 0.5 ? ("critical" as const) : ("low" as const),
    };
  });
}
