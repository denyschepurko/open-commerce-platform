"use client";

import { useActionState } from "react";
import type { Order } from "@/types/order";
import type { FormActionState } from "@/actions/orders";
import { ORDER_STATUSES } from "@/types/enums";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { ROUTES } from "@/lib/routes";

interface OrderFormProps {
  action: (state: FormActionState, formData: FormData) => Promise<FormActionState>;
  order: Order;
}

export function OrderForm({ action, order }: OrderFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  const statusOptions = ORDER_STATUSES.map((s) => ({
    value: s,
    label: s.charAt(0).toUpperCase() + s.slice(1),
  }));

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={order.id} />
      <FormError message={state?.error} />

      <div className="grid grid-cols-2 gap-6">
        {/* Status + note */}
        <Card>
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Order status
          </h2>
          <div className="space-y-4">
            <Select
              label="Status"
              name="status"
              options={statusOptions}
              required
              defaultValue={order.status}
              error={state?.errors?.status}
            />
            <Textarea
              label="Add a note"
              name="note"
              placeholder="Optional note about this update..."
              error={state?.errors?.note}
            />
          </div>
        </Card>

        {/* Shipping address */}
        <Card>
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Shipping address
          </h2>
          <div className="space-y-4">
            <Input
              label="Address line 1"
              name="addressLine1"
              required
              defaultValue={order.shippingAddress.addressLine1}
              error={state?.errors?.addressLine1}
            />
            <Input
              label="Address line 2"
              name="addressLine2"
              defaultValue={order.shippingAddress.addressLine2}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                name="city"
                required
                defaultValue={order.shippingAddress.city}
                error={state?.errors?.city}
              />
              <Input
                label="State"
                name="state"
                required
                defaultValue={order.shippingAddress.state}
                error={state?.errors?.state}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="ZIP"
                name="zip"
                required
                defaultValue={order.shippingAddress.zip}
                error={state?.errors?.zip}
              />
              <Input
                label="Country"
                name="country"
                required
                defaultValue={order.shippingAddress.country}
                error={state?.errors?.country}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button href={ROUTES.ORDER_DETAIL(order.id)} variant="secondary">
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Update Order"}
        </Button>
      </div>
    </form>
  );
}
