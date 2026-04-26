import { z } from "zod";

const productFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  sku: z.string().min(1, "SKU is required").max(50),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be positive"),
  costPrice: z.coerce.number().positive("Cost must be positive").optional(),
  categoryId: z.string().min(1, "Category is required"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  lowStockThreshold: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

export function parseProductForm(formData: FormData) {
  return productFormSchema.safeParse({
    name: formData.get("name"),
    sku: formData.get("sku"),
    description: formData.get("description") || undefined,
    price: formData.get("price"),
    costPrice: formData.get("costPrice") || undefined,
    categoryId: formData.get("categoryId"),
    stock: formData.get("stock"),
    lowStockThreshold: formData.get("lowStockThreshold") || undefined,
    isActive: formData.get("isActive") === "on",
  });
}
