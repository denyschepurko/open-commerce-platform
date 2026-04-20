import type { Order } from "@/types/order";

export const orders: Order[] = [
  // =============================================================================
  // ORD-00001 — COMPLETED (full lifecycle + discount)
  // =============================================================================
  {
    id: "o1",
    orderNo: "ORD-00001",
    customerId: "c1",
    createdBy: "u1",
    customerSnapshot: { firstName: "John", lastName: "Smith", email: "john.smith@example.com", phone: "+1-555-0101" },
    shippingAddress: { addressLine1: "123 Main St", addressLine2: "Apt 4B", city: "Austin", state: "TX", zip: "78701", country: "US" },
    items: [
      { productId: "p1", productName: "Nova Pro 16", productSku: "NVP-16", unitPrice: 2499.00, quantity: 1, subtotal: 2499.00 },
      { productId: "p16", productName: "Echo Buds Pro", productSku: "EBP-2", unitPrice: 249.00, quantity: 1, subtotal: 249.00 },
    ],
    status: "completed",
    payment: { method: "credit_card", status: "paid", transactionId: "ch_3M001", amount: 2898.00, currency: "USD", paidAt: "2026-01-10T10:05:00Z" },
    events: [
      { type: "order_created", timestamp: "2026-01-10T10:00:00Z", userId: "u1", data: { status: "new" } },
      { type: "discount_applied", timestamp: "2026-01-10T10:01:00Z", userId: "u1", data: { code: "WELCOME", amount: 50.00 } },
      { type: "payment_received", timestamp: "2026-01-10T10:05:00Z", userId: "u1", data: { method: "credit_card", amount: 2898.00, transactionId: "ch_3M001", currency: "USD" } },
      { type: "note_added", timestamp: "2026-01-10T10:10:00Z", userId: "u1", data: { note: "Express shipping requested" } },
      { type: "status_changed", timestamp: "2026-01-10T10:30:00Z", userId: "u1", data: { from: "new", to: "confirmed" } },
      { type: "status_changed", timestamp: "2026-01-11T09:00:00Z", userId: "u2", data: { from: "confirmed", to: "processing" } },
      { type: "status_changed", timestamp: "2026-01-12T14:00:00Z", userId: "u2", data: { from: "processing", to: "shipped", note: "FedEx tracking: FX123456" } },
      { type: "status_changed", timestamp: "2026-01-15T11:00:00Z", userId: "u2", data: { from: "shipped", to: "delivered" } },
      { type: "status_changed", timestamp: "2026-02-14T00:00:00Z", userId: "u1", data: { from: "delivered", to: "completed", note: "Return period expired (30 days)" } },
    ],
    subtotal: 2748.00,
    discountAmount: 50.00,
    discountCode: "WELCOME",
    taxAmount: 200.00,
    shippingCost: 0,
    total: 2898.00,
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-02-14T00:00:00Z",
  },

  // =============================================================================
  // ORD-00002 — DELIVERED (partial return)
  // =============================================================================
  {
    id: "o2",
    orderNo: "ORD-00002",
    customerId: "c4",
    createdBy: "u1",
    customerSnapshot: { firstName: "Emily", lastName: "Davis", email: "emily.davis@example.com", phone: "+1-555-0104" },
    shippingAddress: { addressLine1: "654 Elm St", city: "San Antonio", state: "TX", zip: "78201", country: "US" },
    items: [
      { productId: "p1", productName: "Nova Pro 16", productSku: "NVP-16", unitPrice: 2499.00, quantity: 1, subtotal: 2499.00 },
      { productId: "p16", productName: "Echo Buds Pro", productSku: "EBP-2", unitPrice: 249.00, quantity: 2, subtotal: 498.00 },
    ],
    status: "delivered",
    payment: { method: "credit_card", status: "partially_refunded", transactionId: "ch_3M002", amount: 3246.58, currency: "USD", refundedAmount: 249.00, paidAt: "2026-02-20T09:05:00Z" },
    returns: [
      { productId: "p16", productName: "Echo Buds Pro", quantity: 1, reason: "Defective — left bud not charging", refundAmount: 249.00, status: "received", requestedAt: "2026-03-01T14:00:00Z", resolvedAt: "2026-03-05T10:00:00Z" },
    ],
    events: [
      { type: "order_created", timestamp: "2026-02-20T09:00:00Z", userId: "u1", data: { status: "new" } },
      { type: "payment_received", timestamp: "2026-02-20T09:05:00Z", userId: "u1", data: { method: "credit_card", amount: 3246.58, transactionId: "ch_3M002", currency: "USD" } },
      { type: "status_changed", timestamp: "2026-02-20T09:15:00Z", userId: "u1", data: { from: "new", to: "confirmed" } },
      { type: "status_changed", timestamp: "2026-02-21T08:00:00Z", userId: "u2", data: { from: "confirmed", to: "processing" } },
      { type: "status_changed", timestamp: "2026-02-22T15:00:00Z", userId: "u2", data: { from: "processing", to: "shipped", note: "UPS tracking: 1Z999AA1" } },
      { type: "status_changed", timestamp: "2026-02-25T10:30:00Z", userId: "u2", data: { from: "shipped", to: "delivered" } },
      { type: "return_requested", timestamp: "2026-03-01T14:00:00Z", userId: "u1", data: { productId: "p16", productName: "Echo Buds Pro", quantity: 1, reason: "Defective — left bud not charging" } },
      { type: "return_received", timestamp: "2026-03-05T10:00:00Z", userId: "u2", data: { productId: "p16", productName: "Echo Buds Pro", refundAmount: 249.00 } },
      { type: "refund_processed", timestamp: "2026-03-05T10:30:00Z", userId: "u2", data: { amount: 249.00, reason: "Partial refund — defective Echo Buds Pro" } },
    ],
    subtotal: 2997.00,
    taxAmount: 249.58,
    shippingCost: 0,
    total: 3246.58,
    createdAt: "2026-02-20T09:00:00Z",
    updatedAt: "2026-03-05T10:00:00Z",
  },

  // =============================================================================
  // ORD-00003 — SHIPPED
  // =============================================================================
  {
    id: "o3",
    orderNo: "ORD-00003",
    customerId: "c2",
    createdBy: "u1",
    customerSnapshot: { firstName: "Sarah", lastName: "Johnson", email: "sarah.johnson@example.com", phone: "+1-555-0102" },
    shippingAddress: { addressLine1: "789 Oak Ave", city: "Dallas", state: "TX", zip: "75201", country: "US" },
    items: [
      { productId: "p6", productName: "Pulse X1", productSku: "PLX-1", unitPrice: 1199.00, quantity: 1, subtotal: 1199.00 },
      { productId: "p42", productName: "ShieldCase Pulse X1", productSku: "SCP-X1", unitPrice: 39.00, quantity: 1, subtotal: 39.00 },
      { productId: "p54", productName: "ScreenGuard Pulse X1", productSku: "SGP-X1", unitPrice: 19.00, quantity: 2, subtotal: 38.00 },
    ],
    status: "shipped",
    payment: { method: "paypal", status: "paid", transactionId: "PAY-003", amount: 1382.32, currency: "USD", paidAt: "2026-03-10T09:20:00Z" },
    events: [
      { type: "order_created", timestamp: "2026-03-10T09:15:00Z", userId: "u1", data: { status: "new" } },
      { type: "payment_received", timestamp: "2026-03-10T09:20:00Z", userId: "u1", data: { method: "paypal", amount: 1382.32, transactionId: "PAY-003", currency: "USD" } },
      { type: "status_changed", timestamp: "2026-03-10T09:30:00Z", userId: "u1", data: { from: "new", to: "confirmed" } },
      { type: "status_changed", timestamp: "2026-03-11T08:00:00Z", userId: "u2", data: { from: "confirmed", to: "processing" } },
      { type: "status_changed", timestamp: "2026-03-12T11:00:00Z", userId: "u2", data: { from: "processing", to: "shipped", note: "UPS tracking: 1Z888BB2" } },
    ],
    subtotal: 1276.00,
    taxAmount: 106.32,
    shippingCost: 0,
    total: 1382.32,
    createdAt: "2026-03-10T09:15:00Z",
    updatedAt: "2026-03-12T11:00:00Z",
  },

  // =============================================================================
  // ORD-00004 — PROCESSING (gift order)
  // =============================================================================
  {
    id: "o4",
    orderNo: "ORD-00004",
    customerId: "c3",
    createdBy: "u2",
    customerSnapshot: { firstName: "Mike", lastName: "Wilson", email: "mike.wilson@example.com", phone: "+1-555-0103" },
    shippingAddress: { addressLine1: "321 Pine Rd", city: "Houston", state: "TX", zip: "77001", country: "US" },
    items: [
      { productId: "p12", productName: "Slate Tab 11", productSku: "SLT-11", unitPrice: 799.00, quantity: 1, subtotal: 799.00 },
      { productId: "p43", productName: "Slate Pencil", productSku: "SP-2", unitPrice: 129.00, quantity: 1, subtotal: 129.00 },
      { productId: "p44", productName: "Slate Smart Keyboard 11", productSku: "SSK-11", unitPrice: 199.00, quantity: 1, subtotal: 199.00 },
    ],
    status: "processing",
    payment: { method: "credit_card", status: "paid", transactionId: "ch_3M004", amount: 1218.58, currency: "USD", paidAt: "2026-03-15T14:25:00Z" },
    events: [
      { type: "order_created", timestamp: "2026-03-15T14:20:00Z", userId: "u2", data: { status: "new" } },
      { type: "payment_received", timestamp: "2026-03-15T14:25:00Z", userId: "u2", data: { method: "credit_card", amount: 1218.58, transactionId: "ch_3M004", currency: "USD" } },
      { type: "note_added", timestamp: "2026-03-15T14:26:00Z", userId: "u2", data: { note: "Gift wrapping — birthday present for daughter" } },
      { type: "status_changed", timestamp: "2026-03-15T14:30:00Z", userId: "u2", data: { from: "new", to: "confirmed" } },
      { type: "status_changed", timestamp: "2026-03-16T09:00:00Z", userId: "u2", data: { from: "confirmed", to: "processing", note: "Gift wrapping requested" } },
    ],
    subtotal: 1127.00,
    taxAmount: 91.58,
    shippingCost: 0,
    total: 1218.58,
    createdAt: "2026-03-15T14:20:00Z",
    updatedAt: "2026-03-16T09:00:00Z",
  },

  // =============================================================================
  // ORD-00005 — CANCELLED (full refund)
  // =============================================================================
  {
    id: "o5",
    orderNo: "ORD-00005",
    customerId: "c5",
    createdBy: "u1",
    customerSnapshot: { firstName: "David", lastName: "Brown", email: "david.brown@example.com", phone: "+1-555-0105" },
    shippingAddress: { addressLine1: "987 Maple Dr", addressLine2: "Suite 100", city: "Flower Mound", state: "TX", zip: "75028", country: "US" },
    items: [
      { productId: "p27", productName: "Vertex Studio", productSku: "VSD-1", unitPrice: 1999.00, quantity: 1, subtotal: 1999.00 },
      { productId: "p32", productName: "ClearView 27", productSku: "CV-27", unitPrice: 1599.00, quantity: 1, subtotal: 1599.00 },
    ],
    status: "cancelled",
    payment: { method: "bank_transfer", status: "refunded", transactionId: "BT-005", amount: 3897.17, currency: "USD", refundedAmount: 3897.17, paidAt: "2026-03-18T16:10:00Z" },
    events: [
      { type: "order_created", timestamp: "2026-03-18T16:00:00Z", userId: "u1", data: { status: "new" } },
      { type: "payment_received", timestamp: "2026-03-18T16:10:00Z", userId: "u1", data: { method: "bank_transfer", amount: 3897.17, transactionId: "BT-005", currency: "USD" } },
      { type: "status_changed", timestamp: "2026-03-18T16:15:00Z", userId: "u1", data: { from: "new", to: "confirmed" } },
      { type: "status_changed", timestamp: "2026-03-19T09:00:00Z", userId: "u1", data: { from: "confirmed", to: "cancelled", note: "Customer called to cancel — found better price elsewhere" } },
      { type: "refund_processed", timestamp: "2026-03-19T09:30:00Z", userId: "u1", data: { amount: 3897.17, reason: "Full refund — order cancelled by customer" } },
    ],
    subtotal: 3598.00,
    taxAmount: 299.17,
    shippingCost: 0,
    total: 3897.17,
    createdAt: "2026-03-18T16:00:00Z",
    updatedAt: "2026-03-19T09:00:00Z",
  },

  // =============================================================================
  // ORD-00006 — NEW (payment pending)
  // =============================================================================
  {
    id: "o6",
    orderNo: "ORD-00006",
    customerId: "c4",
    createdBy: "u3",
    customerSnapshot: { firstName: "Emily", lastName: "Davis", email: "emily.davis@example.com", phone: "+1-555-0104" },
    shippingAddress: { addressLine1: "654 Elm St", city: "San Antonio", state: "TX", zip: "78201", country: "US" },
    items: [
      { productId: "p16", productName: "Echo Buds Pro", productSku: "EBP-2", unitPrice: 249.00, quantity: 3, subtotal: 747.00 },
    ],
    status: "new",
    payment: { method: "credit_card", status: "pending", amount: 808.88, currency: "USD" },
    events: [
      { type: "order_created", timestamp: "2026-03-20T08:45:00Z", userId: "u3", data: { status: "new" } },
    ],
    subtotal: 747.00,
    taxAmount: 61.88,
    shippingCost: 0,
    total: 808.88,
    createdAt: "2026-03-20T08:45:00Z",
    updatedAt: "2026-03-20T08:45:00Z",
  },

  // =============================================================================
  // ORD-00007 — SHIPPED (watch + bands)
  // =============================================================================
  {
    id: "o7",
    orderNo: "ORD-00007",
    customerId: "c1",
    createdBy: "u1",
    customerSnapshot: { firstName: "John", lastName: "Smith", email: "john.smith@example.com", phone: "+1-555-0101" },
    shippingAddress: { addressLine1: "123 Main St", addressLine2: "Apt 4B", city: "Austin", state: "TX", zip: "78701", country: "US" },
    items: [
      { productId: "p22", productName: "Arc Watch Ultra", productSku: "AWU-2", unitPrice: 799.00, quantity: 1, subtotal: 799.00 },
      { productId: "p48", productName: "ArcLink Magnetic Band", productSku: "ALB-1", unitPrice: 99.00, quantity: 1, subtotal: 99.00 },
      { productId: "p49", productName: "ArcLink Sport Band", productSku: "ALS-1", unitPrice: 49.00, quantity: 2, subtotal: 98.00 },
    ],
    status: "shipped",
    payment: { method: "paypal", status: "paid", transactionId: "PAY-007", amount: 1078.93, currency: "USD", paidAt: "2026-03-21T13:05:00Z" },
    events: [
      { type: "order_created", timestamp: "2026-03-21T13:00:00Z", userId: "u1", data: { status: "new" } },
      { type: "payment_received", timestamp: "2026-03-21T13:05:00Z", userId: "u1", data: { method: "paypal", amount: 1078.93, transactionId: "PAY-007", currency: "USD" } },
      { type: "status_changed", timestamp: "2026-03-21T13:10:00Z", userId: "u1", data: { from: "new", to: "confirmed" } },
      { type: "status_changed", timestamp: "2026-03-22T08:00:00Z", userId: "u2", data: { from: "confirmed", to: "processing" } },
      { type: "status_changed", timestamp: "2026-03-23T10:00:00Z", userId: "u2", data: { from: "processing", to: "shipped", note: "USPS tracking: 9400111899" } },
    ],
    subtotal: 996.00,
    taxAmount: 82.93,
    shippingCost: 0,
    total: 1078.93,
    createdAt: "2026-03-21T13:00:00Z",
    updatedAt: "2026-03-23T10:00:00Z",
  },

  // =============================================================================
  // ORD-00008 — CONFIRMED (corporate, discount, shipping cost)
  // =============================================================================
  {
    id: "o8",
    orderNo: "ORD-00008",
    customerId: "c6",
    createdBy: "u2",
    customerSnapshot: { firstName: "Lisa", lastName: "Anderson", email: "lisa.anderson@example.com", phone: "+1-555-0106" },
    shippingAddress: { addressLine1: "1100 Congress Ave", addressLine2: "Floor 12", city: "Austin", state: "TX", zip: "78701", country: "US" },
    items: [
      { productId: "p4", productName: "Nova Max 17", productSku: "NVM-17", unitPrice: 3499.00, quantity: 2, subtotal: 6998.00 },
      { productId: "p33", productName: "ClearView 32 Pro", productSku: "CV-32P", unitPrice: 2299.00, quantity: 2, subtotal: 4598.00 },
      { productId: "p51", productName: "PortHub USB-C 7-in-1", productSku: "PH7-1", unitPrice: 69.00, quantity: 2, subtotal: 138.00 },
    ],
    status: "confirmed",
    payment: { method: "bank_transfer", status: "paid", transactionId: "BT-008", amount: 12304.46, currency: "USD", paidAt: "2026-03-22T16:00:00Z" },
    events: [
      { type: "order_created", timestamp: "2026-03-22T11:30:00Z", userId: "u2", data: { status: "new" } },
      { type: "discount_applied", timestamp: "2026-03-22T11:31:00Z", userId: "u2", data: { code: "CORP500", amount: 500.00 } },
      { type: "note_added", timestamp: "2026-03-22T11:32:00Z", userId: "u2", data: { note: "Corporate order — Lisa Anderson, TechCorp Inc. 2 workstations for new hires" } },
      { type: "status_changed", timestamp: "2026-03-22T14:00:00Z", userId: "u2", data: { from: "new", to: "confirmed", note: "Corporate purchase — verified with finance dept" } },
      { type: "payment_received", timestamp: "2026-03-22T16:00:00Z", userId: "u2", data: { method: "bank_transfer", amount: 12304.46, transactionId: "BT-008", currency: "USD" } },
    ],
    subtotal: 11734.00,
    discountAmount: 500.00,
    discountCode: "CORP500",
    taxAmount: 1045.46,
    shippingCost: 25.00,
    total: 12304.46,
    createdAt: "2026-03-22T11:30:00Z",
    updatedAt: "2026-03-22T16:00:00Z",
  },

  // =============================================================================
  // ORD-00009 — NEW (payment failed)
  // =============================================================================
  {
    id: "o9",
    orderNo: "ORD-00009",
    customerId: "c7",
    createdBy: "u3",
    customerSnapshot: { firstName: "James", lastName: "Taylor", email: "james.taylor@example.com", phone: "+1-555-0107" },
    shippingAddress: { addressLine1: "2200 Commerce St", city: "Fort Worth", state: "TX", zip: "76102", country: "US" },
    items: [
      { productId: "p7", productName: "Pulse X1 Max", productSku: "PLX-1M", unitPrice: 1499.00, quantity: 1, subtotal: 1499.00 },
    ],
    status: "new",
    payment: { method: "credit_card", status: "failed", amount: 1623.92, currency: "USD", failureReason: "Card declined — insufficient funds" },
    events: [
      { type: "order_created", timestamp: "2026-03-23T14:00:00Z", userId: "u3", data: { status: "new" } },
      { type: "payment_failed", timestamp: "2026-03-23T14:01:00Z", userId: "u3", data: { method: "credit_card", amount: 1623.92, reason: "Card declined — insufficient funds" } },
      { type: "note_added", timestamp: "2026-03-23T14:10:00Z", userId: "u3", data: { note: "Contacted customer, waiting for new card details" } },
    ],
    subtotal: 1499.00,
    taxAmount: 124.92,
    shippingCost: 0,
    total: 1623.92,
    createdAt: "2026-03-23T14:00:00Z",
    updatedAt: "2026-03-23T14:00:00Z",
  },

  // =============================================================================
  // ORD-00010 — DELIVERED (return rejected)
  // =============================================================================
  {
    id: "o10",
    orderNo: "ORD-00010",
    customerId: "c7",
    createdBy: "u1",
    customerSnapshot: { firstName: "James", lastName: "Taylor", email: "james.taylor@example.com", phone: "+1-555-0107" },
    shippingAddress: { addressLine1: "2200 Commerce St", city: "Fort Worth", state: "TX", zip: "76102", country: "US" },
    items: [
      { productId: "p20", productName: "Echo Over-Ear Max", productSku: "EOM-1", unitPrice: 549.00, quantity: 1, subtotal: 549.00 },
      { productId: "p37", productName: "FlexCharge USB-C Cable 1m", productSku: "FCC-1M", unitPrice: 19.00, quantity: 1, subtotal: 19.00 },
    ],
    status: "delivered",
    payment: { method: "credit_card", status: "paid", transactionId: "ch_3M010", amount: 614.93, currency: "USD", paidAt: "2026-02-28T10:05:00Z" },
    returns: [
      { productId: "p20", productName: "Echo Over-Ear Max", quantity: 1, reason: "Changed mind — prefer in-ear style", refundAmount: 0, status: "rejected", requestedAt: "2026-03-20T09:00:00Z", resolvedAt: "2026-03-21T11:00:00Z" },
    ],
    events: [
      { type: "order_created", timestamp: "2026-02-28T10:00:00Z", userId: "u1", data: { status: "new" } },
      { type: "payment_received", timestamp: "2026-02-28T10:05:00Z", userId: "u1", data: { method: "credit_card", amount: 614.93, transactionId: "ch_3M010", currency: "USD" } },
      { type: "status_changed", timestamp: "2026-02-28T10:15:00Z", userId: "u1", data: { from: "new", to: "confirmed" } },
      { type: "status_changed", timestamp: "2026-03-01T08:00:00Z", userId: "u2", data: { from: "confirmed", to: "processing" } },
      { type: "status_changed", timestamp: "2026-03-02T13:00:00Z", userId: "u2", data: { from: "processing", to: "shipped", note: "FedEx tracking: FX789012" } },
      { type: "status_changed", timestamp: "2026-03-05T15:00:00Z", userId: "u2", data: { from: "shipped", to: "delivered" } },
      { type: "return_requested", timestamp: "2026-03-20T09:00:00Z", userId: "u1", data: { productId: "p20", productName: "Echo Over-Ear Max", quantity: 1, reason: "Changed mind — prefer in-ear style" } },
      { type: "return_rejected", timestamp: "2026-03-21T11:00:00Z", userId: "u2", data: { productId: "p20", productName: "Echo Over-Ear Max", reason: "Outside 14-day change-of-mind policy, item was used" } },
    ],
    subtotal: 568.00,
    taxAmount: 46.93,
    shippingCost: 0,
    total: 614.93,
    createdAt: "2026-02-28T10:00:00Z",
    updatedAt: "2026-03-21T11:00:00Z",
  },

  // =============================================================================
  // ORD-00011 — DELIVERED (full return)
  // =============================================================================
  {
    id: "o11",
    orderNo: "ORD-00011",
    customerId: "c8",
    createdBy: "u2",
    customerSnapshot: { firstName: "Anna", lastName: "Martinez", email: "anna.martinez@example.com", phone: "+1-555-0108" },
    shippingAddress: { addressLine1: "450 Riverwalk Blvd", addressLine2: "Unit 7C", city: "San Antonio", state: "TX", zip: "78204", country: "US" },
    items: [
      { productId: "p9", productName: "Pulse Mini", productSku: "PLM-1", unitPrice: 799.00, quantity: 1, subtotal: 799.00 },
      { productId: "p42", productName: "ShieldCase Pulse X1", productSku: "SCP-X1", unitPrice: 39.00, quantity: 1, subtotal: 39.00 },
    ],
    status: "delivered",
    payment: { method: "paypal", status: "refunded", transactionId: "PAY-011", amount: 907.27, currency: "USD", refundedAmount: 907.27, paidAt: "2026-03-01T11:05:00Z" },
    returns: [
      { productId: "p9", productName: "Pulse Mini", quantity: 1, reason: "Screen too small — upgrading to Pulse X1", refundAmount: 865.92, status: "received", requestedAt: "2026-03-10T16:00:00Z", resolvedAt: "2026-03-15T09:00:00Z" },
      { productId: "p42", productName: "ShieldCase Pulse X1", quantity: 1, reason: "Returning with the phone", refundAmount: 41.35, status: "received", requestedAt: "2026-03-10T16:00:00Z", resolvedAt: "2026-03-15T09:00:00Z" },
    ],
    events: [
      { type: "order_created", timestamp: "2026-03-01T11:00:00Z", userId: "u2", data: { status: "new" } },
      { type: "payment_received", timestamp: "2026-03-01T11:05:00Z", userId: "u2", data: { method: "paypal", amount: 907.27, transactionId: "PAY-011", currency: "USD" } },
      { type: "status_changed", timestamp: "2026-03-01T11:20:00Z", userId: "u2", data: { from: "new", to: "confirmed" } },
      { type: "status_changed", timestamp: "2026-03-02T08:00:00Z", userId: "u2", data: { from: "confirmed", to: "processing" } },
      { type: "status_changed", timestamp: "2026-03-03T10:00:00Z", userId: "u2", data: { from: "processing", to: "shipped", note: "USPS tracking: 9400222777" } },
      { type: "status_changed", timestamp: "2026-03-06T14:00:00Z", userId: "u2", data: { from: "shipped", to: "delivered" } },
      { type: "return_requested", timestamp: "2026-03-10T16:00:00Z", userId: "u1", data: { productId: "p9", productName: "Pulse Mini", quantity: 1, reason: "Screen too small — upgrading to Pulse X1" } },
      { type: "return_requested", timestamp: "2026-03-10T16:00:00Z", userId: "u1", data: { productId: "p42", productName: "ShieldCase Pulse X1", quantity: 1, reason: "Returning with the phone" } },
      { type: "return_received", timestamp: "2026-03-15T09:00:00Z", userId: "u2", data: { productId: "p9", productName: "Pulse Mini", refundAmount: 865.92 } },
      { type: "return_received", timestamp: "2026-03-15T09:00:00Z", userId: "u2", data: { productId: "p42", productName: "ShieldCase Pulse X1", refundAmount: 41.35 } },
      { type: "refund_processed", timestamp: "2026-03-15T09:30:00Z", userId: "u2", data: { amount: 907.27, reason: "Full refund — all items returned" } },
    ],
    subtotal: 838.00,
    taxAmount: 69.27,
    shippingCost: 0,
    total: 907.27,
    createdAt: "2026-03-01T11:00:00Z",
    updatedAt: "2026-03-15T09:00:00Z",
  },

  // =============================================================================
  // ORD-00012 — CONFIRMED (VIP customer)
  // =============================================================================
  {
    id: "o12",
    orderNo: "ORD-00012",
    customerId: "c9",
    createdBy: "u1",
    customerSnapshot: { firstName: "Robert", lastName: "Garcia", email: "robert.garcia@example.com", phone: "+1-555-0109" },
    shippingAddress: { addressLine1: "3300 McKinney Ave", addressLine2: "Apt 1805", city: "Dallas", state: "TX", zip: "75204", country: "US" },
    items: [
      { productId: "p1", productName: "Nova Pro 16", productSku: "NVP-16", unitPrice: 2499.00, quantity: 1, subtotal: 2499.00 },
      { productId: "p22", productName: "Arc Watch Ultra", productSku: "AWU-2", unitPrice: 799.00, quantity: 1, subtotal: 799.00 },
      { productId: "p16", productName: "Echo Buds Pro", productSku: "EBP-2", unitPrice: 249.00, quantity: 1, subtotal: 249.00 },
      { productId: "p40", productName: "ShieldCase Nova Pro 16", productSku: "SCN-16", unitPrice: 59.00, quantity: 1, subtotal: 59.00 },
      { productId: "p55", productName: "PowerBlock 35W Charger", productSku: "PB-35", unitPrice: 39.00, quantity: 2, subtotal: 78.00 },
    ],
    status: "confirmed",
    payment: { method: "bank_transfer", status: "paid", transactionId: "BT-012", amount: 3984.07, currency: "USD", paidAt: "2026-03-24T12:00:00Z" },
    events: [
      { type: "order_created", timestamp: "2026-03-24T10:00:00Z", userId: "u1", data: { status: "new" } },
      { type: "note_added", timestamp: "2026-03-24T10:05:00Z", userId: "u1", data: { note: "VIP customer — 11 previous orders. Priority processing." } },
      { type: "status_changed", timestamp: "2026-03-24T10:15:00Z", userId: "u1", data: { from: "new", to: "confirmed", note: "VIP customer — priority processing" } },
      { type: "payment_received", timestamp: "2026-03-24T12:00:00Z", userId: "u1", data: { method: "bank_transfer", amount: 3984.07, transactionId: "BT-012", currency: "USD" } },
    ],
    subtotal: 3684.00,
    taxAmount: 300.07,
    shippingCost: 0,
    total: 3984.07,
    createdAt: "2026-03-24T10:00:00Z",
    updatedAt: "2026-03-24T12:00:00Z",
  },

  // =============================================================================
  // ORD-00013 — NEW (small order, new customer)
  // =============================================================================
  {
    id: "o13",
    orderNo: "ORD-00013",
    customerId: "c10",
    createdBy: "u3",
    customerSnapshot: { firstName: "Jennifer", lastName: "Lee", email: "jennifer.lee@example.com", phone: "+1-555-0110" },
    shippingAddress: { addressLine1: "5500 Greenville Ave", city: "Dallas", state: "TX", zip: "75206", country: "US" },
    items: [
      { productId: "p16", productName: "Echo Buds Pro", productSku: "EBP-2", unitPrice: 249.00, quantity: 1, subtotal: 249.00 },
    ],
    status: "new",
    payment: { method: "credit_card", status: "pending", amount: 269.75, currency: "USD" },
    events: [
      { type: "order_created", timestamp: "2026-03-25T16:20:00Z", userId: "u3", data: { status: "new" } },
    ],
    subtotal: 249.00,
    taxAmount: 20.75,
    shippingCost: 0,
    total: 269.75,
    createdAt: "2026-03-25T16:20:00Z",
    updatedAt: "2026-03-25T16:20:00Z",
  },

  // =============================================================================
  // ORD-00014 — PROCESSING (multi-category, shipping cost)
  // =============================================================================
  {
    id: "o14",
    orderNo: "ORD-00014",
    customerId: "c11",
    createdBy: "u2",
    customerSnapshot: { firstName: "William", lastName: "Chen", email: "william.chen@example.com", phone: "+1-555-0111" },
    shippingAddress: { addressLine1: "8800 Westheimer Rd", addressLine2: "Suite 200", city: "Houston", state: "TX", zip: "77063", country: "US" },
    items: [
      { productId: "p2", productName: "Nova Air 15", productSku: "NVA-15", unitPrice: 1299.00, quantity: 1, subtotal: 1299.00 },
      { productId: "p24", productName: "Arc Watch SE", productSku: "AWS-3", unitPrice: 249.00, quantity: 1, subtotal: 249.00 },
      { productId: "p17", productName: "Echo Buds Lite", productSku: "EBL-1", unitPrice: 129.00, quantity: 1, subtotal: 129.00 },
      { productId: "p38", productName: "FlexCharge USB-C Cable 2m", productSku: "FCC-2M", unitPrice: 29.00, quantity: 2, subtotal: 58.00 },
      { productId: "p56", productName: "PowerBlock 96W Charger", productSku: "PB-96", unitPrice: 79.00, quantity: 1, subtotal: 79.00 },
    ],
    status: "processing",
    payment: { method: "credit_card", status: "paid", transactionId: "ch_3M014", amount: 1977.22, currency: "USD", paidAt: "2026-03-24T15:05:00Z" },
    events: [
      { type: "order_created", timestamp: "2026-03-24T15:00:00Z", userId: "u2", data: { status: "new" } },
      { type: "payment_received", timestamp: "2026-03-24T15:05:00Z", userId: "u2", data: { method: "credit_card", amount: 1977.22, transactionId: "ch_3M014", currency: "USD" } },
      { type: "status_changed", timestamp: "2026-03-24T15:20:00Z", userId: "u2", data: { from: "new", to: "confirmed" } },
      { type: "status_changed", timestamp: "2026-03-25T08:00:00Z", userId: "u2", data: { from: "confirmed", to: "processing", note: "All items in stock, packing started" } },
    ],
    subtotal: 1814.00,
    taxAmount: 148.22,
    shippingCost: 15.00,
    total: 1977.22,
    createdAt: "2026-03-24T15:00:00Z",
    updatedAt: "2026-03-25T08:00:00Z",
  },

  // =============================================================================
  // ORD-00015 — DELIVERED (return in progress)
  // =============================================================================
  {
    id: "o15",
    orderNo: "ORD-00015",
    customerId: "c9",
    createdBy: "u1",
    customerSnapshot: { firstName: "Robert", lastName: "Garcia", email: "robert.garcia@example.com", phone: "+1-555-0109" },
    shippingAddress: { addressLine1: "7700 Gateway East", city: "El Paso", state: "TX", zip: "79915", country: "US" },
    items: [
      { productId: "p11", productName: "Slate Tab Pro 13", productSku: "STP-13", unitPrice: 1299.00, quantity: 1, subtotal: 1299.00 },
      { productId: "p45", productName: "Slate Smart Keyboard 13", productSku: "SSK-13", unitPrice: 299.00, quantity: 1, subtotal: 299.00 },
      { productId: "p43", productName: "Slate Pencil", productSku: "SP-2", unitPrice: 129.00, quantity: 1, subtotal: 129.00 },
    ],
    status: "delivered",
    payment: { method: "credit_card", status: "paid", transactionId: "ch_3M015", amount: 1868.93, currency: "USD", paidAt: "2026-03-05T09:05:00Z" },
    returns: [
      { productId: "p45", productName: "Slate Smart Keyboard 13", quantity: 1, reason: "Keys feel too mushy — prefer external keyboard", refundAmount: 323.67, status: "approved", requestedAt: "2026-03-18T10:00:00Z" },
    ],
    events: [
      { type: "order_created", timestamp: "2026-03-05T09:00:00Z", userId: "u1", data: { status: "new" } },
      { type: "payment_received", timestamp: "2026-03-05T09:05:00Z", userId: "u1", data: { method: "credit_card", amount: 1868.93, transactionId: "ch_3M015", currency: "USD" } },
      { type: "status_changed", timestamp: "2026-03-05T09:30:00Z", userId: "u1", data: { from: "new", to: "confirmed" } },
      { type: "status_changed", timestamp: "2026-03-06T08:00:00Z", userId: "u2", data: { from: "confirmed", to: "processing" } },
      { type: "status_changed", timestamp: "2026-03-07T12:00:00Z", userId: "u2", data: { from: "processing", to: "shipped", note: "FedEx tracking: FX555333" } },
      { type: "status_changed", timestamp: "2026-03-10T16:00:00Z", userId: "u2", data: { from: "shipped", to: "delivered" } },
      { type: "return_requested", timestamp: "2026-03-18T10:00:00Z", userId: "u1", data: { productId: "p45", productName: "Slate Smart Keyboard 13", quantity: 1, reason: "Keys feel too mushy — prefer external keyboard" } },
      { type: "return_approved", timestamp: "2026-03-18T14:00:00Z", userId: "u2", data: { productId: "p45", productName: "Slate Smart Keyboard 13" } },
      { type: "note_added", timestamp: "2026-03-18T14:05:00Z", userId: "u2", data: { note: "Customer shipping keyboard back — return label sent via email" } },
    ],
    subtotal: 1727.00,
    taxAmount: 141.93,
    shippingCost: 0,
    total: 1868.93,
    createdAt: "2026-03-05T09:00:00Z",
    updatedAt: "2026-03-18T10:00:00Z",
  },
];