"use client";

import type { RevenuePeriod } from "@/lib/services/dashboardService";
import { formatCurrency, formatCurrencyCompact } from "@/lib/formatters";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function RevenueChart({ data }: { data: RevenuePeriod[] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Revenue overview
          </h2>
          <p className="text-sm text-gray-500">Weekly revenue trend</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            tickFormatter={(v) => formatCurrencyCompact(v)}
          />
          <Tooltip
            contentStyle={{
              background: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "13px",
            }}
            formatter={(value) => [
              formatCurrency(Number(value)),
              "Revenue",
            ]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
