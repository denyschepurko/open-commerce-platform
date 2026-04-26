"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseOrderEditForm, parseOrderCreateForm } from "@/lib/validations/order";
import { createOrder, updateOrder, deleteOrder } from "@/lib/services/orderService";
import { getCurrentUser } from "@/lib/auth";
import { ROUTES } from "@/lib/routes";

export type FormActionState = {
  error?: string;
  errors?: Record<string, string>;
} | null;

export async function createOrderAction(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const result = parseOrderCreateForm(formData);

  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      errors[path || "items"] = issue.message;
    });
    return { errors };
  }

  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated" };

  try {
    const order = await createOrder(result.data, user.id);
    revalidatePath(ROUTES.ORDERS);
    redirect(ROUTES.ORDER_DETAIL(order.id));
  } catch (e) {
    if (e instanceof Error && e.message.includes("not found")) {
      return { error: e.message };
    }
    throw e;
  }
}

export async function updateOrderAction(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const id = formData.get("id") as string;
  const result = parseOrderEditForm(formData);

  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      errors[issue.path[0] as string] = issue.message;
    });
    return { errors };
  }

  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated" };

  const order = await updateOrder(id, result.data, user.id);
  if (!order) return { error: "Order not found" };

  revalidatePath(ROUTES.ORDERS);
  revalidatePath(ROUTES.ORDER_DETAIL(id));
  redirect(ROUTES.ORDER_DETAIL(id));
}

export async function deleteOrderAction(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  await deleteOrder(id);
  revalidatePath(ROUTES.ORDERS);
  redirect(ROUTES.ORDERS);
}
