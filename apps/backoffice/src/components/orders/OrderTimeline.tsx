import type { OrderEvent } from "@/types/event";
import {
  EVENT_CONFIG,
  getEventTitle,
  getEventDescription,
} from "@/types/event";
import { formatDateTime } from "@/lib/formatters";

interface OrderTimelineProps {
  events: OrderEvent[];
}

const DOT_COLORS: Record<string, string> = {
  blue: "bg-blue-500 ring-blue-50",
  green: "bg-green-500 ring-green-50",
  red: "bg-red-500 ring-red-50",
  yellow: "bg-yellow-500 ring-yellow-50",
  gray: "bg-gray-400 ring-gray-50",
  purple: "bg-purple-500 ring-purple-50",
};

export function OrderTimeline({ events }: OrderTimelineProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
        Activity log
      </h2>
      <div>
        {events.map((event, index) => {
          const config = EVENT_CONFIG[event.type];
          const title = getEventTitle(event);
          const description = getEventDescription(event);

          return (
            <div key={index} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full ring-4 mt-1.5 ${DOT_COLORS[config.color]}`}
                />
                {index < events.length - 1 && (
                  <div className="w-px flex-1 bg-gray-200 mt-1" />
                )}
              </div>
              <div className="pb-6">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                {description && (
                  <p className="text-xs text-gray-500 mt-0.5">{description}</p>
                )}
                <p className="text-xs text-gray-400 mt-0.5">
                  {formatDateTime(event.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
