import { z } from "zod";
import type { OrderStatus } from "@/types/enums";
import { ORDER_STATUSES } from "@/types/enums";

const orderEditSchema = z.object({
  status: z.enum(ORDER_STATUSES as [OrderStatus, ...OrderStatus[]]),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP is required"),
  country: z.string().min(1, "Country is required"),
  note: z.string().optional(),
});

const orderItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce.number().int().positive(),
});

const orderCreateSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP is required"),
  country: z.string().min(1, "Country is required"),
  note: z.string().optional(),
});

export type OrderEditData = z.infer<typeof orderEditSchema>;
export type OrderCreateData = z.infer<typeof orderCreateSchema>;

export function parseOrderEditForm(formData: FormData) {
  return orderEditSchema.safeParse({
    status: formData.get("status"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2") || undefined,
    city: formData.get("city"),
    state: formData.get("state"),
    zip: formData.get("zip"),
    country: formData.get("country"),
    note: formData.get("note") || undefined,
  });
}

export function parseOrderCreateForm(formData: FormData) {
  let items: unknown[] = [];
  try {
    items = JSON.parse(formData.get("items") as string);
  } catch {
    /* empty */
  }

  return orderCreateSchema.safeParse({
    customerId: formData.get("customerId"),
    items,
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2") || undefined,
    city: formData.get("city"),
    state: formData.get("state"),
    zip: formData.get("zip"),
    country: formData.get("country"),
    note: formData.get("note") || undefined,
  });
}
