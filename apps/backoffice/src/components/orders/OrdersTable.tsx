"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { type ColumnDef, type SortingState } from "@tanstack/react-table";
import type { Order } from "@/types/order";
import { getOrderCustomerName } from "@/types/order";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { ORDER_STATUSES } from "@/types/enums";
import { ROUTES } from "@/lib/routes";
import { formatCurrency, formatDate } from "@/lib/formatters";

const columns: ColumnDef<Order, unknown>[] = [
  {
    accessorKey: "orderNo",
    header: "Order",
    size: 130,
    cell: ({ row }) => (
      <span className="text-sm font-medium text-blue-600">
        {row.original.orderNo}
      </span>
    ),
  },
  {
    id: "customer",
    header: "Customer",
    size: 200,
    enableSorting: true,
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium text-gray-900">
          {getOrderCustomerName(row.original)}
        </p>
        <p className="text-xs text-gray-500">
          {row.original.customerSnapshot.email}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 120,
    cell: ({ row }) => <Badge type="order" status={row.original.status} />,
  },
  {
    id: "payment",
    header: "Payment",
    size: 150,
    enableSorting: false,
    cell: ({ row }) =>
      row.original.payment.status ? (
        <Badge type="payment" status={row.original.payment.status} />
      ) : null,
  },
  {
    id: "items",
    header: "Items",
    size: 80,
    enableSorting: false,
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {row.original.items.length} item
        {row.original.items.length > 1 ? "s" : ""}
      </span>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    size: 110,
    cell: ({ row }) => (
      <span className="text-sm font-medium text-gray-900">
        {formatCurrency(row.original.total)}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    size: 110,
    cell: ({ row }) => (
      <span className="text-sm text-gray-500">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
];

interface OrdersTableProps {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function OrdersTable({
  orders,
  total,
  page,
  limit,
  totalPages,
}: OrdersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Build a new URL with updated params
  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      router.push(`${ROUTES.ORDERS}?${params.toString()}`);
    },
    [router, searchParams],
  );

  // Current state from URL
  const currentSearch = searchParams.get("search") ?? "";
  const currentStatus = searchParams.get("status") ?? "";
  const currentSortBy = searchParams.get("sortBy") ?? "createdAt";
  const currentSortOrder = searchParams.get("sortOrder") ?? "desc";

  const sorting: SortingState = [
    { id: currentSortBy, desc: currentSortOrder === "desc" },
  ];

  return (
    <DataTable
      data={orders}
      columns={columns}
      total={total}
      page={page}
      pageSize={limit}
      totalPages={totalPages}
      sorting={sorting}
      globalFilter={currentSearch}
      searchPlaceholder="Search by order number, customer name, or email..."
      onSortingChange={(newSorting) => {
        if (newSorting.length > 0) {
          updateParams({
            sortBy: newSorting[0].id,
            sortOrder: newSorting[0].desc ? "desc" : "asc",
            page: "1",
          });
        }
      }}
      onPageChange={(newPage) => {
        updateParams({ page: newPage.toString() });
      }}
      onSearchChange={(search) => {
        updateParams({ search: search || undefined, page: "1" });
      }}
      onRowClick={(order) => router.push(ROUTES.ORDER_DETAIL(order.id))}
      filterSlot={
        <select
          value={currentStatus}
          onChange={(e) =>
            updateParams({ status: e.target.value || undefined, page: "1" })
          }
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All statuses</option>
          {ORDER_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      }
    />
  );
}
