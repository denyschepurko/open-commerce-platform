"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseCustomerForm } from "@/lib/validations/customer";
import { createCustomer, updateCustomer, deleteCustomer } from "@/lib/services/customerService";
import { ROUTES } from "@/lib/routes";

export type FormActionState = {
  error?: string;
  errors?: Record<string, string>;
} | null;

export async function createCustomerAction(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const result = parseCustomerForm(formData);

  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      errors[issue.path[0] as string] = issue.message;
    });
    return { errors };
  }

  const customer = await createCustomer(result.data);
  revalidatePath(ROUTES.CUSTOMERS);
  redirect(ROUTES.CUSTOMER_DETAIL(customer.id));
}

export async function updateCustomerAction(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const id = formData.get("id") as string;
  const result = parseCustomerForm(formData);

  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      errors[issue.path[0] as string] = issue.message;
    });
    return { errors };
  }

  const customer = await updateCustomer(id, result.data);
  if (!customer) return { error: "Customer not found" };

  revalidatePath(ROUTES.CUSTOMERS);
  revalidatePath(ROUTES.CUSTOMER_DETAIL(id));
  redirect(ROUTES.CUSTOMER_DETAIL(id));
}

export async function deleteCustomerAction(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  await deleteCustomer(id);
  revalidatePath(ROUTES.CUSTOMERS);
  redirect(ROUTES.CUSTOMERS);
}
