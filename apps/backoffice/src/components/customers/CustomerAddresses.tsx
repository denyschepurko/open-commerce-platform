import type { Address } from "@/types/address";
import { Card } from "@/components/ui/Card";

export function CustomerAddresses({ addresses }: { addresses: Address[] }) {
  return (
    <div className="col-span-2">
      <Card>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
          Addresses ({addresses.length})
        </h2>
        {addresses.length === 0 ? (
          <p className="text-sm text-gray-500">No addresses on file</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {addresses.map((addr, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-lg p-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {addr.type}
                  </span>
                  {addr.isDefault && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-900">{addr.addressLine1}</p>
                {addr.addressLine2 && (
                  <p className="text-sm text-gray-700">
                    {addr.addressLine2}
                  </p>
                )}
                <p className="text-sm text-gray-700">
                  {addr.city}, {addr.state} {addr.zip}
                </p>
                <p className="text-sm text-gray-500">{addr.country}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
