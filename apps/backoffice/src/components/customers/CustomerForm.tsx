"use client";

import { useActionState } from "react";
import type { Customer } from "@/types/customer";
import { getDefaultShippingAddress } from "@/types/customer";
import type { FormActionState } from "@/actions/customers";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { ROUTES } from "@/lib/routes";

interface CustomerFormProps {
  action: (state: FormActionState, formData: FormData) => Promise<FormActionState>;
  customer?: Customer;
}

export function CustomerForm({ action, customer }: CustomerFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);
  const defaultAddr = customer ? getDefaultShippingAddress(customer) : undefined;

  return (
    <form action={formAction} className="space-y-6">
      {customer && <input type="hidden" name="id" value={customer.id} />}
      <FormError message={state?.error} />

      <div className="grid grid-cols-2 gap-6">
        {/* Personal info */}
        <Card>
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Personal info
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First name"
                name="firstName"
                required
                defaultValue={customer?.firstName}
                error={state?.errors?.firstName}
              />
              <Input
                label="Last name"
                name="lastName"
                required
                defaultValue={customer?.lastName}
                error={state?.errors?.lastName}
              />
            </div>
            <Input
              label="Middle name"
              name="middleName"
              defaultValue={customer?.middleName}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              required
              defaultValue={customer?.email}
              error={state?.errors?.email}
            />
            <Input
              label="Phone"
              name="phone"
              defaultValue={customer?.phone}
            />
          </div>
        </Card>

        {/* Default shipping address */}
        <Card>
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Default shipping address
          </h2>
          <div className="space-y-4">
            <Input
              label="Address line 1"
              name="addressLine1"
              required
              defaultValue={defaultAddr?.addressLine1}
              error={state?.errors?.addressLine1}
            />
            <Input
              label="Address line 2"
              name="addressLine2"
              defaultValue={defaultAddr?.addressLine2}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                name="city"
                required
                defaultValue={defaultAddr?.city}
                error={state?.errors?.city}
              />
              <Input
                label="State"
                name="state"
                required
                defaultValue={defaultAddr?.state}
                error={state?.errors?.state}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="ZIP"
                name="zip"
                required
                defaultValue={defaultAddr?.zip}
                error={state?.errors?.zip}
              />
              <Input
                label="Country"
                name="country"
                required
                defaultValue={defaultAddr?.country}
                error={state?.errors?.country}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button href={ROUTES.CUSTOMERS} variant="secondary">
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : customer ? "Update Customer" : "Create Customer"}
        </Button>
      </div>
    </form>
  );
}
