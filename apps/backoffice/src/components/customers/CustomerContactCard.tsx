import type { Customer } from "@/types/customer";
import { Card } from "@/components/ui/Card";

export function CustomerContactCard({ customer }: { customer: Customer }) {
  return (
    <Card>
      <h2 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
        Contact
      </h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Email</span>
          <span className="text-sm text-gray-900">{customer.email}</span>
        </div>
        {customer.phone && (
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Phone</span>
            <span className="text-sm text-gray-900">{customer.phone}</span>
          </div>
        )}
        {customer.middleName && (
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Middle name</span>
            <span className="text-sm text-gray-900">
              {customer.middleName}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
