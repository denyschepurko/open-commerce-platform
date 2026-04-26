"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseProductForm } from "@/lib/validations/product";
import { createProduct, updateProduct, deleteProduct } from "@/lib/services/productService";
import { ROUTES } from "@/lib/routes";

export type FormActionState = {
  error?: string;
  errors?: Record<string, string>;
} | null;

export async function createProductAction(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const result = parseProductForm(formData);

  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      errors[issue.path[0] as string] = issue.message;
    });
    return { errors };
  }

  const product = await createProduct(result.data);
  revalidatePath(ROUTES.PRODUCTS);
  redirect(ROUTES.PRODUCT_DETAIL(product.id));
}

export async function updateProductAction(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const id = formData.get("id") as string;
  const result = parseProductForm(formData);

  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      errors[issue.path[0] as string] = issue.message;
    });
    return { errors };
  }

  const product = await updateProduct(id, result.data);
  if (!product) return { error: "Product not found" };

  revalidatePath(ROUTES.PRODUCTS);
  revalidatePath(ROUTES.PRODUCT_DETAIL(id));
  redirect(ROUTES.PRODUCT_DETAIL(id));
}

export async function deleteProductAction(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  await deleteProduct(id);
  revalidatePath(ROUTES.PRODUCTS);
  redirect(ROUTES.PRODUCTS);
}
