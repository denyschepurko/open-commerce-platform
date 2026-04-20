"use client";

import type { StatusCount } from "@/lib/services/dashboardService";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function OrdersByStatusChart({
  data,
  total,
}: {
  data: StatusCount[];
  total: number;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold text-gray-900">Orders by status</h2>
      <p className="text-sm text-gray-500 mb-4">Current distribution</p>

      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={3}
              dataKey="count"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "13px",
              }}
              formatter={(value, name) => [`${value} orders`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{total}</p>
            <p className="text-xs text-gray-500">total</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-600">{entry.name}</span>
            <span className="text-xs font-medium text-gray-900 ml-auto">
              {entry.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
