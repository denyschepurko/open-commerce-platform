"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { type ColumnDef, type SortingState } from "@tanstack/react-table";
import type { Customer } from "@/types/customer";
import { getCustomerFullName, getCustomerTier } from "@/types/customer";
import { DataTable } from "@/components/ui/DataTable";
import { ROUTES } from "@/lib/routes";
import { formatCurrency, formatDate } from "@/lib/formatters";

const columns: ColumnDef<Customer, unknown>[] = [
  {
    id: "name",
    header: "Customer",
    size: 220,
    enableSorting: true,
    accessorFn: (row) => getCustomerFullName(row),
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium text-gray-900">
          {getCustomerFullName(row.original)}
        </p>
        <p className="text-xs text-gray-500">{row.original.email}</p>
      </div>
    ),
  },
  {
    id: "phone",
    header: "Phone",
    size: 140,
    enableSorting: false,
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">{row.original.phone ?? "—"}</span>
    ),
  },
  {
    id: "location",
    header: "Location",
    size: 180,
    enableSorting: false,
    cell: ({ row }) => {
      const addr =
        row.original.addresses.find(
          (a) => a.type === "shipping" && a.isDefault,
        ) ||
        row.original.addresses.find((a) => a.type === "shipping") ||
        row.original.addresses[0];
      return (
        <span className="text-sm text-gray-600">
          {addr ? `${addr.city}, ${addr.state}` : "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "totalOrders",
    header: "Orders",
    size: 80,
    cell: ({ row }) => (
      <span className="text-sm text-gray-900">{row.original.totalOrders}</span>
    ),
  },
  {
    accessorKey: "totalSpent",
    header: "Total Spent",
    size: 120,
    cell: ({ row }) => (
      <span className="text-sm font-medium text-gray-900">
        {formatCurrency(row.original.totalSpent)}
      </span>
    ),
  },
  {
    accessorKey: "lifetimeValue",
    header: "LTV",
    size: 100,
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {formatCurrency(row.original.lifetimeValue)}
      </span>
    ),
  },
  {
    id: "lastOrder",
    header: "Last Order",
    size: 110,
    enableSorting: false,
    cell: ({ row }) => (
      <span className="text-sm text-gray-500">
        {row.original.lastOrderAt
          ? formatDate(row.original.lastOrderAt)
          : "Never"}
      </span>
    ),
  },
  {
    id: "tier",
    header: "Tier",
    size: 90,
    enableSorting: false,
    cell: ({ row }) => {
      const tier = getCustomerTier(row.original.totalSpent);

      return (
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded-full ${tier.color}`}
        >
          {tier.label}
        </span>
      );
    },
  },
];

interface CustomersTableProps {
  customers: Customer[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function CustomersTable({
  customers,
  total,
  page,
  limit,
  totalPages,
}: CustomersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

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

      router.push(`${ROUTES.CUSTOMERS}?${params.toString()}`);
    },
    [router, searchParams],
  );

  const currentSearch = searchParams.get("search") ?? "";
  const currentSortBy = searchParams.get("sortBy") ?? "totalSpent";
  const currentSortOrder = searchParams.get("sortOrder") ?? "desc";

  const sorting: SortingState = [
    {
      id: currentSortBy === "name" ? "name" : currentSortBy,
      desc: currentSortOrder === "desc",
    },
  ];

  return (
    <DataTable
      data={customers}
      columns={columns}
      total={total}
      page={page}
      pageSize={limit}
      totalPages={totalPages}
      sorting={sorting}
      globalFilter={currentSearch}
      searchPlaceholder="Search by name, email, or phone..."
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
      onRowClick={(customer) =>
        router.push(ROUTES.CUSTOMER_DETAIL(customer.id))
      }
    />
  );
}
