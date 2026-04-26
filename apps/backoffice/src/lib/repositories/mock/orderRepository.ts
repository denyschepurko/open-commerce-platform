import type { OrderRepository } from "../interfaces";
import type { QueryParams, PaginatedResult } from "../types";
import type { Order } from "@/types/order";
import { orders } from "./data/orders";
import { getOrderCustomerName } from "@/types/order";

export const mockOrderRepository: OrderRepository = {
  async findAll(params?: QueryParams): Promise<PaginatedResult<Order>> {
    let filtered = [...orders];

    if (params?.status) {
      filtered = filtered.filter((o) => o.status === params.status);
    }

    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.orderNo.toLowerCase().includes(s) ||
          o.customerSnapshot.firstName.toLowerCase().includes(s) ||
          o.customerSnapshot.lastName.toLowerCase().includes(s) ||
          o.customerSnapshot.email.toLowerCase().includes(s),
      );
    }

    const sortBy = params?.sortBy ?? "createdAt";
    const sortOrder = params?.sortOrder ?? "desc";

    filtered.sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;

      switch (sortBy) {
        case "orderNo":
          aVal = a.orderNo;
          bVal = b.orderNo;
          break;
        case "customer":
          aVal = getOrderCustomerName(a).toLowerCase();
          bVal = getOrderCustomerName(b).toLowerCase();
          break;
        case "status":
          aVal = a.status;
          bVal = b.status;
          break;
        case "total":
          aVal = a.total;
          bVal = b.total;
          break;
        case "createdAt":
        default:
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
          break;
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    const total = filtered.length;
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const start = (page - 1) * limit;

    return {
      data: filtered.slice(start, start + limit),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  async findById(id: string) {
    return orders.find((o) => o.id === id) ?? null;
  },

  async count() {
    return orders.length;
  },

  async sumRevenue() {
    return orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total, 0);
  },

  async countByStatus() {
    const counts = new Map<string, number>();
    orders.forEach((o) => {
      counts.set(o.status, (counts.get(o.status) ?? 0) + 1);
    });
    return [...counts.entries()].map(([status, count]) => ({ status, count }));
  },

  async getTopSellingProducts(limit: number) {
    const sales = new Map<
      string,
      { productId: string; name: string; quantity: number; revenue: number }
    >();

    orders
      .filter((o) => o.status !== "cancelled")
      .forEach((order) => {
        order.items.forEach((item) => {
          const existing = sales.get(item.productId);
          if (existing) {
            existing.quantity += item.quantity;
            existing.revenue += item.subtotal;
          } else {
            sales.set(item.productId, {
              productId: item.productId,
              name: item.productName,
              quantity: item.quantity,
              revenue: item.subtotal,
            });
          }
        });
      });

    return [...sales.values()]
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, limit);
  },

  async getRevenueByPeriod() {
    const activeOrders = [...orders]
      .filter((o) => o.status !== "cancelled")
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );

    if (activeOrders.length === 0) return [];

    const earliest = new Date(activeOrders[0].createdAt);
    const latest = new Date(activeOrders[activeOrders.length - 1].createdAt);

    const weeks: { start: Date; end: Date; label: string }[] = [];
    const current = new Date(earliest);
    current.setHours(0, 0, 0, 0);
    current.setDate(current.getDate() - current.getDay() + 1);

    let weekNum = 1;
    while (current <= latest) {
      const weekStart = new Date(current);
      const weekEnd = new Date(current);
      weekEnd.setDate(weekEnd.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      weeks.push({ start: weekStart, end: weekEnd, label: `Week ${weekNum}` });
      current.setDate(current.getDate() + 7);
      weekNum++;
    }

    return weeks
      .map((week) => {
        const revenue = activeOrders
          .filter((o) => {
            const date = new Date(o.createdAt);
            return date >= week.start && date <= week.end;
          })
          .reduce((sum, o) => sum + o.total, 0);

        return { label: week.label, revenue: Math.round(revenue * 100) / 100 };
      })
      .filter((w) => w.revenue > 0);
  },

  async findByCustomerId(customerId: string) {
    return [...orders]
      .filter((o) => o.customerId === customerId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  },

  async create(order: Order) {
    orders.push(order);
    return order;
  },

  async update(id: string, updates: Partial<Order>) {
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return null;
    Object.assign(orders[index], updates);
    return orders[index];
  },

  async delete(id: string) {
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return false;
    orders.splice(index, 1);
    return true;
  },
};
