"use client";

import { useActionState } from "react";
import type { Product, Category } from "@/types/product";
import type { FormActionState } from "@/actions/products";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { ROUTES } from "@/lib/routes";

interface ProductFormProps {
  action: (state: FormActionState, formData: FormData) => Promise<FormActionState>;
  product?: Product;
  categories: Category[];
}

export function ProductForm({ action, product, categories }: ProductFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <form action={formAction} className="space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}
      <FormError message={state?.error} />

      <div className="grid grid-cols-3 gap-6">
        {/* Basic info */}
        <div className="col-span-2">
          <Card>
            <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Product info
            </h2>
            <div className="space-y-4">
              <Input
                label="Name"
                name="name"
                required
                defaultValue={product?.name}
                error={state?.errors?.name}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="SKU"
                  name="sku"
                  required
                  defaultValue={product?.sku}
                  error={state?.errors?.sku}
                />
                <Select
                  label="Category"
                  name="categoryId"
                  options={categoryOptions}
                  required
                  defaultValue={product?.categoryId}
                  error={state?.errors?.categoryId}
                />
              </div>
              <Textarea
                label="Description"
                name="description"
                rows={4}
                defaultValue={product?.description}
                error={state?.errors?.description}
              />
            </div>
          </Card>
        </div>

        {/* Pricing & inventory */}
        <Card>
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Pricing & Inventory
          </h2>
          <div className="space-y-4">
            <Input
              label="Selling price"
              name="price"
              type="number"
              step="0.01"
              required
              defaultValue={product?.price?.toString()}
              error={state?.errors?.price}
            />
            <Input
              label="Cost price"
              name="costPrice"
              type="number"
              step="0.01"
              defaultValue={product?.costPrice?.toString()}
              error={state?.errors?.costPrice}
            />
            <Input
              label="Stock"
              name="stock"
              type="number"
              required
              defaultValue={product?.stock?.toString() ?? "0"}
              error={state?.errors?.stock}
            />
            <Input
              label="Low stock threshold"
              name="lowStockThreshold"
              type="number"
              defaultValue={product?.lowStockThreshold?.toString()}
              error={state?.errors?.lowStockThreshold}
            />
            <Checkbox
              label="Active"
              name="isActive"
              defaultChecked={product?.isActive ?? true}
            />
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button href={ROUTES.PRODUCTS} variant="secondary">
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : product ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
