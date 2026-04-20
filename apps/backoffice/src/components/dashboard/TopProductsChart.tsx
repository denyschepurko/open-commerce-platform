"use client";

import type { TopProduct } from "@/lib/services/dashboardService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const BAR_COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#c084fc"];

export function TopProductsChart({ data }: { data: TopProduct[] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold text-gray-900">Top products</h2>
      <p className="text-sm text-gray-500 mb-4">By units sold</p>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 10, right: 20 }}
        >
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#4b5563", fontSize: 12 }}
            width={120}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              background: "#1f2937",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
            }}
            itemStyle={{ color: "#9ca3af" }}
            labelStyle={{
              color: "#fff",
              fontSize: "12px",
              marginBottom: "4px",
            }}
            formatter={(value) => [`${value} units`, "Sold"]}
          />
          <Bar
            dataKey="quantity"
            radius={[0, 4, 4, 0]}
            barSize={20}
            activeBar={{ fillOpacity: 1, strokeWidth: 2, stroke: "#fff" }}
            fillOpacity={0.7}
          >
            {data.map((_entry, index) => (
              <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
