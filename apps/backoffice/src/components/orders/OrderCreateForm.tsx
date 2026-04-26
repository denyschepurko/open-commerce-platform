"use client";

import { useActionState, useState } from "react";
import type { Customer } from "@/types/customer";
import type { Product } from "@/types/product";
import type { FormActionState } from "@/actions/orders";
import { getCustomerFullName } from "@/types/customer";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { ROUTES } from "@/lib/routes";
import { formatCurrency } from "@/lib/formatters";

interface OrderCreateFormProps {
  action: (state: FormActionState, formData: FormData) => Promise<FormActionState>;
  customers: Customer[];
  products: Product[];
}

interface LineItem {
  productId: string;
  quantity: number;
}

export function OrderCreateForm({ action, customers, products }: OrderCreateFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);
  const [items, setItems] = useState<LineItem[]>([{ productId: "", quantity: 1 }]);

  const customerOptions = customers.map((c) => ({
    value: c.id,
    label: `${getCustomerFullName(c)} (${c.email})`,
  }));

  const productOptions = products
    .filter((p) => p.isActive)
    .map((p) => ({
      value: p.id,
      label: `${p.name} — ${formatCurrency(p.price)}`,
    }));

  function addItem() {
    setItems([...items, { productId: "", quantity: 1 }]);
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  function updateItem(index: number, field: keyof LineItem, value: string | number) {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  }

  const validItems = items.filter((i) => i.productId && i.quantity > 0);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="items" value={JSON.stringify(validItems)} />
      <FormError message={state?.error} />

      <div className="grid grid-cols-2 gap-6">
        {/* Customer + items */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Customer
            </h2>
            <Select
              label="Customer"
              name="customerId"
              options={customerOptions}
              required
              error={state?.errors?.customerId}
            />
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Items
              </h2>
              <button
                type="button"
                onClick={addItem}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                + Add item
              </button>
            </div>
            {state?.errors?.items && (
              <p className="text-xs text-red-600 mb-3">{state.errors.items}</p>
            )}
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product
                    </label>
                    <select
                      value={item.productId}
                      onChange={(e) => updateItem(index, "productId", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select...</option>
                      {productOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Qty
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="px-3 py-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Shipping address + note */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Shipping address
            </h2>
            <div className="space-y-4">
              <Input
                label="Address line 1"
                name="addressLine1"
                required
                error={state?.errors?.addressLine1}
              />
              <Input label="Address line 2" name="addressLine2" />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  name="city"
                  required
                  error={state?.errors?.city}
                />
                <Input
                  label="State"
                  name="state"
                  required
                  error={state?.errors?.state}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="ZIP"
                  name="zip"
                  required
                  error={state?.errors?.zip}
                />
                <Input
                  label="Country"
                  name="country"
                  required
                  error={state?.errors?.country}
                />
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Notes
            </h2>
            <Textarea
              label="Order note"
              name="note"
              placeholder="Optional note..."
            />
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button href={ROUTES.ORDERS} variant="secondary">
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Order"}
        </Button>
      </div>
    </form>
  );
}
