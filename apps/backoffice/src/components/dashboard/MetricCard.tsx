"use client";

import { useEffect, useState } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  trend?: { value: number; label: string };
  color?: "default" | "yellow" | "green" | "purple";
  subtitle?: string;
}

const BORDER_COLORS = {
  default: "border-l-blue-500",
  yellow: "border-l-yellow-500",
  green: "border-l-green-500",
  purple: "border-l-purple-500",
};

export function MetricCard({
  title,
  value,
  trend,
  color = "default",
  subtitle,
}: MetricCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const animationClass = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-2";

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm border-l-4 ${BORDER_COLORS[color]} transition-all duration-500 hover:shadow-md hover:-translate-y-0.5 ${animationClass}`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      {trend && (
        <div className="flex items-center gap-1 mt-2">
          <span
            className={`text-xs font-medium ${trend.value >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-gray-400">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
