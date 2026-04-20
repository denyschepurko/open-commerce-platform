"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { type ColumnDef, type SortingState } from "@tanstack/react-table";
import type { Product } from "@/types/product";
import type { Category } from "@/types/product";
import {
  getPrimaryImageUrl,
  getProfitMargin,
  isLowStock,
} from "@/types/product";
import { DataTable } from "@/components/ui/DataTable";
import { ROUTES } from "@/lib/routes";
import { formatCurrency, formatPercent } from "@/lib/formatters";

function buildColumns(categories: Category[]): ColumnDef<Product, unknown>[] {
  return [
    {
      id: "product",
      header: "Product",
      size: 280,
      enableSorting: true,
      accessorFn: (row) => row.name,
      cell: ({ row }) => {
        const imageUrl = getPrimaryImageUrl(row.original);
        return (
          <div className="flex items-center gap-3">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={row.original.name}
                className="w-10 h-10 rounded-lg object-cover bg-gray-100"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                No img
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">
                {row.original.name}
              </p>
              <p className="text-xs text-gray-500">{row.original.sku}</p>
            </div>
          </div>
        );
      },
    },
    {
      id: "category",
      header: "Category",
      size: 120,
      enableSorting: false,
      cell: ({ row }) => {
        const cat = categories.find((c) => c.id === row.original.categoryId);
        return (
          <span className="text-sm text-gray-600">
            {cat?.name ?? "Unknown"}
          </span>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      size: 100,
      cell: ({ row }) => (
        <span className="text-sm font-medium text-gray-900">
          {formatCurrency(row.original.price)}
        </span>
      ),
    },
    {
      id: "cost",
      header: "Cost",
      size: 100,
      enableSorting: false,
      cell: ({ row }) => (
        <span className="text-sm text-gray-500">
          {row.original.costPrice
            ? formatCurrency(row.original.costPrice)
            : "—"}
        </span>
      ),
    },
    {
      id: "margin",
      header: "Margin",
      size: 80,
      enableSorting: false,
      cell: ({ row }) => {
        const margin = getProfitMargin(row.original);
        if (margin === null)
          return <span className="text-sm text-gray-400">—</span>;
        return (
          <span className="text-sm text-gray-600">{formatPercent(margin)}</span>
        );
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
      size: 90,
      cell: ({ row }) => {
        const low = isLowStock(row.original);
        return (
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-medium ${low ? "text-red-600" : "text-gray-900"}`}
            >
              {row.original.stock}
            </span>
            {low && (
              <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-red-100 text-red-700">
                Low
              </span>
            )}
          </div>
        );
      },
    },
    {
      id: "status",
      header: "Status",
      size: 90,
      enableSorting: false,
      cell: ({ row }) => (
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
            row.original.isActive
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {row.original.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];
}

interface ProductsTableProps {
  products: Product[];
  categories: Category[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function ProductsTable({
  products,
  categories,
  total,
  page,
  limit,
  totalPages,
}: ProductsTableProps) {
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

      router.push(`${ROUTES.PRODUCTS}?${params.toString()}`);
    },
    [router, searchParams],
  );

  const currentSearch = searchParams.get("search") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const currentSortBy = searchParams.get("sortBy") ?? "name";
  const currentSortOrder = searchParams.get("sortOrder") ?? "asc";

  const sorting: SortingState = [
    {
      id: currentSortBy === "name" ? "product" : currentSortBy,
      desc: currentSortOrder === "desc",
    },
  ];

  const columns = useMemo(() => buildColumns(categories), [categories]);

  return (
    <DataTable
      data={products}
      columns={columns}
      total={total}
      page={page}
      pageSize={limit}
      totalPages={totalPages}
      sorting={sorting}
      globalFilter={currentSearch}
      searchPlaceholder="Search by name, SKU, or description..."
      onSortingChange={(newSorting) => {
        if (newSorting.length > 0) {
          const sortId =
            newSorting[0].id === "product" ? "name" : newSorting[0].id;
          updateParams({
            sortBy: sortId,
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
      onRowClick={(product) => router.push(ROUTES.PRODUCT_DETAIL(product.id))}
      filterSlot={
        <select
          value={currentCategory}
          onChange={(e) =>
            updateParams({ category: e.target.value || undefined, page: "1" })
          }
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      }
    />
  );
}
