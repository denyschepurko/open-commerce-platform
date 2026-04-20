"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  sorting: SortingState;
  globalFilter: string;
  onSortingChange: (sorting: SortingState) => void;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
  onRowClick?: (row: T) => void;
  searchPlaceholder?: string;
  filterSlot?: React.ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  total,
  page,
  pageSize,
  totalPages,
  sorting,
  globalFilter,
  onSortingChange,
  onPageChange,
  onSearchChange,
  onRowClick,
  searchPlaceholder = "Search...",
  filterSlot,
}: DataTableProps<T>) {
  const pagination: PaginationState = {
    pageIndex: page - 1,
    pageSize,
  };

  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      onSortingChange(newSorting);
    },
    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  return (
    <div>
      {/* Search + filters */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {filterSlot}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center gap-1 ${
                            header.column.getCanSort()
                              ? "cursor-pointer hover:text-gray-700 select-none"
                              : ""
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: " ↑",
                            desc: " ↓",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No results found
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      onRowClick ? "cursor-pointer" : ""
                    }`}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4"
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">
          Showing {total === 0 ? 0 : startItem}–{endItem} of {total}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1.5 text-sm rounded-lg ${
                  pageNum === page
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            ),
          )}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
