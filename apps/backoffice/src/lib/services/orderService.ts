import { orderRepository, productRepository, customerRepository } from "@/lib/repositories";
import type { Order } from "@/types/order";
import type { QueryParams, PaginatedResult } from "@/lib/repositories/types";
import type { OrderEditData, OrderCreateData } from "@/lib/validations/order";
import type { OrderEvent } from "@/types/event";

export async function getOrders(
  params?: QueryParams,
): Promise<PaginatedResult<Order>> {
  return orderRepository.findAll(params);
}

export async function getOrderById(id: string): Promise<Order | null> {
  return orderRepository.findById(id);
}

export async function createOrder(data: OrderCreateData, userId: string): Promise<Order> {
  const customer = await customerRepository.findById(data.customerId);
  if (!customer) throw new Error("Customer not found");

  const items = await Promise.all(
    data.items.map(async (item) => {
      const product = await productRepository.findById(item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      return {
        productId: product.id,
        productName: product.name,
        productSku: product.sku,
        unitPrice: product.price,
        quantity: item.quantity,
        subtotal: product.price * item.quantity,
      };
    }),
  );

  const subtotal = items.reduce((sum, i) => sum + i.subtotal, 0);
  const taxRate = 0.0825;
  const taxAmount = Math.round(subtotal * taxRate * 100) / 100;
  const total = subtotal + taxAmount;

  const now = new Date().toISOString();
  const count = await orderRepository.count();
  const orderNo = `ORD-${String(count + 1).padStart(5, "0")}`;

  const events: OrderEvent[] = [
    { type: "order_created", timestamp: now, userId, data: { status: "new" } },
  ];

  if (data.note) {
    events.push({ type: "note_added", timestamp: now, userId, data: { note: data.note } });
  }

  const order: Order = {
    id: `ord-${Date.now()}`,
    orderNo,
    customerId: customer.id,
    createdBy: userId,
    customerSnapshot: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
    },
    shippingAddress: {
      type: "shipping",
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: data.country,
    },
    items,
    payment: { status: "pending" },
    status: "new",
    events,
    subtotal,
    taxAmount,
    total,
    createdAt: now,
    updatedAt: now,
  };

  return orderRepository.create(order);
}

export async function updateOrder(id: string, data: OrderEditData, userId: string): Promise<Order | null> {
  const order = await orderRepository.findById(id);
  if (!order) return null;

  const now = new Date().toISOString();
  const newEvents: OrderEvent[] = [];

  if (data.status !== order.status) {
    newEvents.push({
      type: "status_changed",
      timestamp: now,
      userId,
      data: { from: order.status, to: data.status },
    });
  }

  const addressChanged =
    data.addressLine1 !== order.shippingAddress.addressLine1 ||
    data.city !== order.shippingAddress.city ||
    data.state !== order.shippingAddress.state ||
    data.zip !== order.shippingAddress.zip ||
    data.country !== order.shippingAddress.country;

  if (addressChanged) {
    newEvents.push({
      type: "address_changed",
      timestamp: now,
      userId,
      data: {
        from: order.shippingAddress,
        to: {
          type: "shipping",
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
        },
      },
    });
  }

  if (data.note) {
    newEvents.push({ type: "note_added", timestamp: now, userId, data: { note: data.note } });
  }

  return orderRepository.update(id, {
    status: data.status,
    shippingAddress: {
      type: "shipping",
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: data.country,
    },
    events: [...order.events, ...newEvents],
    updatedAt: now,
  });
}

export async function deleteOrder(id: string): Promise<boolean> {
  return orderRepository.delete(id);
}
