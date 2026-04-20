import type { Product } from "@/types/product";

export const products: Product[] = [
  // =============================================================================
  // LAPTOPS (cat1) — Nova brand — 5 products
  // =============================================================================
  {
    id: "p1", name: "Nova Pro 16", sku: "NVP-16",
    description: "Zenith Z3 Pro chip, 18GB RAM, 512GB SSD, 16-inch Retina display",
    price: 2499.00, costPrice: 1800.00, categoryId: "cat1",
    stock: 25, lowStockThreshold: 5, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/1a1a2e/eaeaea?text=Nova+Pro+16", altText: "Nova Pro 16 front", sortOrder: 1, isPrimary: true },
      { type: "image", url: "https://placehold.co/600x400/1a1a2e/eaeaea?text=Nova+Pro+16+Side", altText: "Nova Pro 16 side", sortOrder: 2 },
    ],
    createdAt: "2025-01-15T00:00:00Z", updatedAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "p2", name: "Nova Air 15", sku: "NVA-15",
    description: "Zenith Z3 chip, 15-inch, 8GB RAM, 256GB SSD, fanless design",
    price: 1299.00, costPrice: 900.00, categoryId: "cat1",
    stock: 40, lowStockThreshold: 8, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/1a1a2e/eaeaea?text=Nova+Air+15", altText: "Nova Air 15", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-02-01T00:00:00Z",
  },
  {
    id: "p3", name: "Nova Book 14", sku: "NVB-14",
    description: "Zenith Z2 chip, 14-inch, 16GB RAM, 512GB SSD, lightweight",
    price: 1599.00, costPrice: 1050.00, categoryId: "cat1",
    stock: 35, lowStockThreshold: 7, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/1a1a2e/eaeaea?text=Nova+Book+14", altText: "Nova Book 14", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "p4", name: "Nova Max 17", sku: "NVM-17",
    description: "Zenith Z3 Max chip, 36GB RAM, 1TB SSD, 17-inch XDR display",
    price: 3499.00, costPrice: 2500.00, categoryId: "cat1",
    stock: 10, lowStockThreshold: 3, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/1a1a2e/eaeaea?text=Nova+Max+17", altText: "Nova Max 17", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-04-01T00:00:00Z",
  },
  {
    id: "p5", name: "Nova Lite 13", sku: "NVL-13",
    description: "Zenith Z1 chip, 13-inch, 8GB RAM, 128GB SSD, student edition",
    price: 899.00, costPrice: 580.00, categoryId: "cat1",
    stock: 60, lowStockThreshold: 10, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/1a1a2e/eaeaea?text=Nova+Lite+13", altText: "Nova Lite 13", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-05-01T00:00:00Z",
  },

  // =============================================================================
  // SMARTPHONES (cat2) — Pulse brand — 5 products
  // =============================================================================
  {
    id: "p6", name: "Pulse X1", sku: "PLX-1",
    description: "Helix A18 chip, titanium frame, 256GB, 6.7-inch OLED",
    price: 1199.00, costPrice: 750.00, categoryId: "cat2",
    stock: 100, lowStockThreshold: 15, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/0f3460/eaeaea?text=Pulse+X1", altText: "Pulse X1", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "p7", name: "Pulse X1 Max", sku: "PLX-1M",
    description: "Helix A18 chip, titanium frame, 512GB, 6.9-inch OLED, periscope camera",
    price: 1499.00, costPrice: 950.00, categoryId: "cat2",
    stock: 45, lowStockThreshold: 8, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/0f3460/eaeaea?text=Pulse+X1+Max", altText: "Pulse X1 Max", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "p8", name: "Pulse Lite", sku: "PLL-1",
    description: "Helix A16 chip, 128GB, 6.1-inch OLED, budget flagship",
    price: 699.00, costPrice: 400.00, categoryId: "cat2",
    stock: 150, lowStockThreshold: 20, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/0f3460/eaeaea?text=Pulse+Lite", altText: "Pulse Lite", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "p9", name: "Pulse Mini", sku: "PLM-1",
    description: "Helix A17 chip, 128GB, 5.4-inch OLED, compact design",
    price: 799.00, costPrice: 470.00, categoryId: "cat2",
    stock: 70, lowStockThreshold: 10, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/0f3460/eaeaea?text=Pulse+Mini", altText: "Pulse Mini", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-04-01T00:00:00Z",
  },
  {
    id: "p10", name: "Pulse SE", sku: "PLS-3",
    description: "Helix A15 chip, 64GB, 6.1-inch LCD, affordable entry",
    price: 429.00, costPrice: 220.00, categoryId: "cat2",
    stock: 200, lowStockThreshold: 30, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/0f3460/eaeaea?text=Pulse+SE", altText: "Pulse SE", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-05-01T00:00:00Z",
  },

  // =============================================================================
  // TABLETS (cat3) — Slate brand — 5 products
  // =============================================================================
  {
    id: "p11", name: "Slate Tab Pro 13", sku: "STP-13",
    description: "Zenith Z3 chip, 13-inch XDR, 256GB, Thunderbolt, pro workflows",
    price: 1299.00, costPrice: 850.00, categoryId: "cat3",
    stock: 30, lowStockThreshold: 5, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/16213e/eaeaea?text=Slate+Tab+Pro", altText: "Slate Tab Pro 13", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "p12", name: "Slate Tab 11", sku: "SLT-11",
    description: "Zenith Z2 chip, 11-inch Liquid Retina, 128GB",
    price: 799.00, costPrice: 500.00, categoryId: "cat3",
    stock: 50, lowStockThreshold: 10, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/16213e/eaeaea?text=Slate+Tab+11", altText: "Slate Tab 11", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "p13", name: "Slate Tab Air 10", sku: "STA-10",
    description: "Zenith Z1 chip, 10.9-inch, 64GB, lightweight everyday tablet",
    price: 599.00, costPrice: 350.00, categoryId: "cat3",
    stock: 80, lowStockThreshold: 12, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/16213e/eaeaea?text=Slate+Tab+Air", altText: "Slate Tab Air 10", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "p14", name: "Slate Tab Mini 8", sku: "STM-8",
    description: "Helix A16 chip, 8.3-inch, 64GB, portable reading and notes",
    price: 499.00, costPrice: 280.00, categoryId: "cat3",
    stock: 65, lowStockThreshold: 10, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/16213e/eaeaea?text=Slate+Tab+Mini", altText: "Slate Tab Mini 8", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-04-01T00:00:00Z",
  },
  {
    id: "p15", name: "Slate Tab Kids 10", sku: "STK-10",
    description: "Helix A14 chip, 10-inch, 32GB, rugged case, parental controls",
    price: 349.00, costPrice: 170.00, categoryId: "cat3",
    stock: 45, lowStockThreshold: 8, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/16213e/eaeaea?text=Slate+Tab+Kids", altText: "Slate Tab Kids 10", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-05-01T00:00:00Z",
  },
  // =============================================================================
  // AUDIO (cat4) — Echo brand — 6 products
  // =============================================================================
  {
    id: "p16", name: "Echo Buds Pro", sku: "EBP-2",
    description: "Active noise cancellation, spatial audio, USB-C case",
    price: 249.00, costPrice: 120.00, categoryId: "cat4",
    stock: 200, lowStockThreshold: 20, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/1b1b2f/eaeaea?text=Echo+Buds+Pro", altText: "Echo Buds Pro", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-02-01T00:00:00Z",
  },
  {
    id: "p17", name: "Echo Buds Lite", sku: "EBL-1",
    description: "Transparency mode, 24hr battery, IPX4 water resistant",
    price: 129.00, costPrice: 55.00, categoryId: "cat4",
    stock: 300, lowStockThreshold: 30, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/1b1b2f/eaeaea?text=Echo+Buds+Lite", altText: "Echo Buds Lite", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "p18", name: "Echo Studio Speaker", sku: "ESS-1",
    description: "360° spatial audio, room-filling sound, voice assistant built-in",
    price: 349.00, costPrice: 180.00, categoryId: "cat4",
    stock: 75, lowStockThreshold: 10, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/1b1b2f/eaeaea?text=Echo+Studio", altText: "Echo Studio Speaker", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "p19", name: "Echo Soundbar", sku: "ESB-1",
    description: "Dolby Atmos, 7.1 surround, HDMI eARC, wall-mountable",
    price: 499.00, costPrice: 270.00, categoryId: "cat4",
    stock: 40, lowStockThreshold: 5, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/1b1b2f/eaeaea?text=Echo+Soundbar", altText: "Echo Soundbar", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-04-01T00:00:00Z",
  },
  {
    id: "p20", name: "Echo Over-Ear Max", sku: "EOM-1",
    description: "Premium over-ear headphones, ANC, 40hr battery, lossless audio",
    price: 549.00, costPrice: 300.00, categoryId: "cat4",
    stock: 55, lowStockThreshold: 8, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/1b1b2f/eaeaea?text=Echo+Over-Ear", altText: "Echo Over-Ear Max", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-05-01T00:00:00Z",
  },
  {
    id: "p21", name: "Echo Portable Mini", sku: "EPM-1",
    description: "Pocket-size Bluetooth speaker, IP67 waterproof, 12hr battery",
    price: 79.00, costPrice: 30.00, categoryId: "cat4",
    stock: 180, lowStockThreshold: 25, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/1b1b2f/eaeaea?text=Echo+Mini", altText: "Echo Portable Mini", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-05-15T00:00:00Z",
  },
// =============================================================================
  // WEARABLES (cat5) — Arc brand — 5 products
  // =============================================================================
  {
    id: "p22", name: "Arc Watch Ultra", sku: "AWU-2",
    description: "Titanium case, GPS + Cellular, 49mm, 72hr battery, dive computer",
    price: 799.00, costPrice: 450.00, categoryId: "cat5",
    stock: 30, lowStockThreshold: 5, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/162447/eaeaea?text=Arc+Watch+Ultra", altText: "Arc Watch Ultra", sortOrder: 1, isPrimary: true },
      { type: "video", url: "https://placehold.co/600x400/162447/eaeaea?text=Arc+Ultra+Video", altText: "Arc Watch Ultra promo", sortOrder: 2 },
    ],
    createdAt: "2025-02-01T00:00:00Z",
  },
  {
    id: "p23", name: "Arc Watch Pro", sku: "AWP-10",
    description: "Stainless steel, GPS + Cellular, 45mm, always-on display",
    price: 499.00, costPrice: 280.00, categoryId: "cat5",
    stock: 60, lowStockThreshold: 10, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/162447/eaeaea?text=Arc+Watch+Pro", altText: "Arc Watch Pro", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "p24", name: "Arc Watch SE", sku: "AWS-3",
    description: "Aluminum case, GPS, 41mm, health tracking, swim-proof",
    price: 249.00, costPrice: 130.00, categoryId: "cat5",
    stock: 90, lowStockThreshold: 15, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/162447/eaeaea?text=Arc+Watch+SE", altText: "Arc Watch SE", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "p25", name: "Arc Band Fit", sku: "ABF-2",
    description: "Fitness tracker, heart rate, sleep, 14-day battery, slim band",
    price: 99.00, costPrice: 40.00, categoryId: "cat5",
    stock: 140, lowStockThreshold: 20, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/162447/eaeaea?text=Arc+Band+Fit", altText: "Arc Band Fit", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-04-01T00:00:00Z",
  },
  {
    id: "p26", name: "Arc Watch Kids", sku: "AWK-1",
    description: "GPS tracking, SOS button, geofencing, parental controls",
    price: 149.00, costPrice: 65.00, categoryId: "cat5",
    stock: 55, lowStockThreshold: 8, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/162447/eaeaea?text=Arc+Watch+Kids", altText: "Arc Watch Kids", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-05-01T00:00:00Z",
  },

  // =============================================================================
  // DESKTOPS (cat6) — Vertex brand — 5 products
  // =============================================================================
  {
    id: "p27", name: "Vertex Studio", sku: "VSD-1",
    description: "Zenith Z3 Ultra chip, 64GB RAM, 1TB SSD, compact form factor",
    price: 1999.00, costPrice: 1400.00, categoryId: "cat6",
    stock: 15, lowStockThreshold: 3, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/0a1628/eaeaea?text=Vertex+Studio", altText: "Vertex Studio", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-02-01T00:00:00Z",
  },
  {
    id: "p28", name: "Vertex Studio Max", sku: "VSM-1",
    description: "Zenith Z3 Ultra chip, 192GB RAM, 4TB SSD, rack-mountable",
    price: 3999.00, costPrice: 2800.00, categoryId: "cat6",
    stock: 5, lowStockThreshold: 2, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/0a1628/eaeaea?text=Vertex+Studio+Max", altText: "Vertex Studio Max", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "p29", name: "Vertex Mini", sku: "VMI-1",
    description: "Zenith Z3 chip, 16GB RAM, 256GB SSD, palm-sized desktop",
    price: 699.00, costPrice: 420.00, categoryId: "cat6",
    stock: 45, lowStockThreshold: 8, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/0a1628/eaeaea?text=Vertex+Mini", altText: "Vertex Mini", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-04-01T00:00:00Z",
  },
  {
    id: "p30", name: "Vertex All-in-One 24", sku: "VAO-24",
    description: "Zenith Z3 chip, 24-inch 4.5K display, 16GB RAM, built-in webcam",
    price: 1499.00, costPrice: 950.00, categoryId: "cat6",
    stock: 22, lowStockThreshold: 4, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/0a1628/eaeaea?text=Vertex+AIO+24", altText: "Vertex All-in-One 24", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-04-15T00:00:00Z",
  },
  {
    id: "p31", name: "Vertex Tower Pro", sku: "VTP-1",
    description: "Zenith Z3 Max chip, 96GB RAM, 2TB SSD, expandable tower, dual GPU slots",
    price: 5499.00, costPrice: 3800.00, categoryId: "cat6",
    stock: 3, lowStockThreshold: 2, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/0a1628/eaeaea?text=Vertex+Tower+Pro", altText: "Vertex Tower Pro", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-05-01T00:00:00Z",
  },

  // =============================================================================
  // MONITORS (cat7) — ClearView brand — 5 products
  // =============================================================================
  {
    id: "p32", name: "ClearView 27", sku: "CV-27",
    description: "27-inch 5K IPS, built-in webcam, USB-C hub, color-calibrated",
    price: 1599.00, costPrice: 1100.00, categoryId: "cat7",
    stock: 20, lowStockThreshold: 4, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/0e1f40/eaeaea?text=ClearView+27", altText: "ClearView 27", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-02-01T00:00:00Z",
  },
  {
    id: "p33", name: "ClearView 32 Pro", sku: "CV-32P",
    description: "32-inch 6K mini-LED, HDR 1600, nano-texture glass option",
    price: 2299.00, costPrice: 1600.00, categoryId: "cat7",
    stock: 8, lowStockThreshold: 3, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/0e1f40/eaeaea?text=ClearView+32+Pro", altText: "ClearView 32 Pro", sortOrder: 1, isPrimary: true },
      { type: "image", url: "https://placehold.co/600x400/0e1f40/eaeaea?text=ClearView+32+Rear", altText: "ClearView 32 Pro rear", sortOrder: 2 },
    ],
    createdAt: "2025-04-01T00:00:00Z",
  },
  {
    id: "p34", name: "ClearView 24", sku: "CV-24",
    description: "24-inch 4.5K IPS, USB-C 96W charge, studio speakers",
    price: 1299.00, costPrice: 880.00, categoryId: "cat7",
    stock: 35, lowStockThreshold: 6, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/0e1f40/eaeaea?text=ClearView+24", altText: "ClearView 24", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "p35", name: "ClearView Portable 15", sku: "CVP-15",
    description: "15.6-inch 1080p IPS, USB-C powered, 780g, travel monitor",
    price: 349.00, costPrice: 180.00, categoryId: "cat7",
    stock: 60, lowStockThreshold: 10, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/0e1f40/eaeaea?text=ClearView+Portable", altText: "ClearView Portable 15", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-05-01T00:00:00Z",
  },
  {
    id: "p36", name: "ClearView Ultra Wide 34", sku: "CVW-34",
    description: "34-inch curved ultrawide, 5K2K, 120Hz, USB-C hub, KVM switch",
    price: 1899.00, costPrice: 1300.00, categoryId: "cat7",
    stock: 12, lowStockThreshold: 3, isActive: true,
    media: [
      { type: "image", url: "https://placehold.co/600x400/0e1f40/eaeaea?text=ClearView+UW+34", altText: "ClearView Ultra Wide 34", sortOrder: 1, isPrimary: true },
    ],
    createdAt: "2025-05-15T00:00:00Z",
  },

  // =============================================================================
  // ACCESSORIES (cat8) — 22 products (for pagination testing)
  // =============================================================================
  {
    id: "p37", name: "FlexCharge USB-C Cable 1m", sku: "FCC-1M",
    description: "1m braided USB-C to USB-C, 100W charging, 10Gbps data",
    price: 19.00, costPrice: 5.00, categoryId: "cat8",
    stock: 600, lowStockThreshold: 50, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=FlexCharge+1m", altText: "FlexCharge 1m", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "p38", name: "FlexCharge USB-C Cable 2m", sku: "FCC-2M",
    description: "2m braided USB-C to USB-C, 100W charging, 10Gbps data",
    price: 29.00, costPrice: 8.00, categoryId: "cat8",
    stock: 500, lowStockThreshold: 50, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=FlexCharge+2m", altText: "FlexCharge 2m", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "p39", name: "FlexCharge Lightning Cable 1m", sku: "FCL-1M",
    description: "1m braided USB-C to Lightning, MFi certified, 30W fast charge",
    price: 24.00, costPrice: 7.00, categoryId: "cat8",
    stock: 400, lowStockThreshold: 40, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=FlexCharge+Lightning", altText: "FlexCharge Lightning", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-02-01T00:00:00Z",
  },
  {
    id: "p40", name: "ShieldCase Nova Pro 16", sku: "SCN-16",
    description: "Hardshell case for Nova Pro 16, shock-absorbing corners, clear",
    price: 59.00, costPrice: 18.00, categoryId: "cat8",
    stock: 120, lowStockThreshold: 15, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=ShieldCase+16", altText: "ShieldCase Nova Pro 16", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-02-01T00:00:00Z",
  },
  {
    id: "p41", name: "ShieldCase Nova Air 15", sku: "SCN-15",
    description: "Hardshell case for Nova Air 15, matte black finish",
    price: 49.00, costPrice: 15.00, categoryId: "cat8",
    stock: 95, lowStockThreshold: 12, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=ShieldCase+15", altText: "ShieldCase Nova Air 15", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-02-15T00:00:00Z",
  },
  {
    id: "p42", name: "ShieldCase Pulse X1", sku: "SCP-X1",
    description: "Slim phone case for Pulse X1, MagSafe compatible, TPU bumper",
    price: 39.00, costPrice: 10.00, categoryId: "cat8",
    stock: 250, lowStockThreshold: 30, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=ShieldCase+X1", altText: "ShieldCase Pulse X1", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "p43", name: "Slate Pencil", sku: "SP-2",
    description: "Pressure-sensitive stylus, magnetic attach, wireless charging",
    price: 129.00, costPrice: 55.00, categoryId: "cat8",
    stock: 4, lowStockThreshold: 10, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=Slate+Pencil", altText: "Slate Pencil", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "p44", name: "Slate Smart Keyboard 11", sku: "SSK-11",
    description: "Detachable keyboard for Slate Tab 11, backlit keys, trackpad",
    price: 199.00, costPrice: 85.00, categoryId: "cat8",
    stock: 35, lowStockThreshold: 5, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=Slate+Keyboard+11", altText: "Slate Smart Keyboard 11", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "p45", name: "Slate Smart Keyboard 13", sku: "SSK-13",
    description: "Detachable keyboard for Slate Tab Pro 13, full-size keys, trackpad",
    price: 299.00, costPrice: 130.00, categoryId: "cat8",
    stock: 20, lowStockThreshold: 4, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=Slate+Keyboard+13", altText: "Slate Smart Keyboard 13", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-03-15T00:00:00Z",
  },
  {
    id: "p46", name: "PowerDock 4-in-1", sku: "PD4-1",
    description: "Charges phone, watch, buds, and tablet simultaneously, Qi2",
    price: 149.00, costPrice: 60.00, categoryId: "cat8",
    stock: 70, lowStockThreshold: 10, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=PowerDock+4in1", altText: "PowerDock 4-in-1", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-03-15T00:00:00Z",
  },
  {
    id: "p47", name: "PowerDock Travel", sku: "PDT-1",
    description: "Foldable 3-in-1 charger, Qi2, carry pouch included",
    price: 79.00, costPrice: 30.00, categoryId: "cat8",
    stock: 110, lowStockThreshold: 15, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=PowerDock+Travel", altText: "PowerDock Travel", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-04-01T00:00:00Z",
  },
  {
    id: "p48", name: "ArcLink Magnetic Band", sku: "ALB-1",
    description: "Stainless steel milanese loop for Arc Watch, magnetic clasp",
    price: 99.00, costPrice: 35.00, categoryId: "cat8",
    stock: 85, lowStockThreshold: 12, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=ArcLink+Band", altText: "ArcLink Magnetic Band", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-04-01T00:00:00Z",
  },
  {
    id: "p49", name: "ArcLink Sport Band", sku: "ALS-1",
    description: "Silicone sport band for Arc Watch, sweat-proof, 6 colors",
    price: 49.00, costPrice: 12.00, categoryId: "cat8",
    stock: 350, lowStockThreshold: 40, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=ArcLink+Sport", altText: "ArcLink Sport Band", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-04-01T00:00:00Z",
  },
  {
    id: "p50", name: "ArcLink Leather Band", sku: "ALL-1",
    description: "Premium Italian leather band for Arc Watch, magnetic buckle",
    price: 149.00, costPrice: 55.00, categoryId: "cat8",
    stock: 40, lowStockThreshold: 6, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=ArcLink+Leather", altText: "ArcLink Leather Band", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-04-15T00:00:00Z",
  },
  {
    id: "p51", name: "PortHub USB-C 7-in-1", sku: "PH7-1",
    description: "HDMI 4K, 2x USB-A, USB-C PD, SD/microSD, Ethernet",
    price: 69.00, costPrice: 25.00, categoryId: "cat8",
    stock: 130, lowStockThreshold: 15, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=PortHub+7in1", altText: "PortHub 7-in-1", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-04-15T00:00:00Z",
  },
  {
    id: "p52", name: "PortHub USB-C 12-in-1", sku: "PH12-1",
    description: "Dual HDMI 4K, 3x USB-A, USB-C PD 100W, SD, Ethernet, VGA, audio",
    price: 119.00, costPrice: 48.00, categoryId: "cat8",
    stock: 65, lowStockThreshold: 8, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=PortHub+12in1", altText: "PortHub 12-in-1", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-05-01T00:00:00Z",
  },
  {
    id: "p53", name: "ScreenGuard Nova Pro 16", sku: "SGN-16",
    description: "Anti-glare matte screen protector for Nova Pro 16, easy install kit",
    price: 29.00, costPrice: 6.00, categoryId: "cat8",
    stock: 220, lowStockThreshold: 25, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=ScreenGuard+16", altText: "ScreenGuard Nova Pro 16", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-05-01T00:00:00Z",
  },
  {
    id: "p54", name: "ScreenGuard Pulse X1", sku: "SGP-X1",
    description: "Tempered glass screen protector for Pulse X1, 9H hardness, 2-pack",
    price: 19.00, costPrice: 4.00, categoryId: "cat8",
    stock: 380, lowStockThreshold: 40, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=ScreenGuard+X1", altText: "ScreenGuard Pulse X1", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-05-01T00:00:00Z",
  },
  {
    id: "p55", name: "PowerBlock 35W Charger", sku: "PB-35",
    description: "Compact USB-C charger, 35W, GaN technology, foldable prongs",
    price: 39.00, costPrice: 14.00, categoryId: "cat8",
    stock: 200, lowStockThreshold: 25, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=PowerBlock+35W", altText: "PowerBlock 35W", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-05-15T00:00:00Z",
  },
  {
    id: "p56", name: "PowerBlock 96W Charger", sku: "PB-96",
    description: "Dual USB-C charger, 96W total, GaN, laptop + phone simultaneously",
    price: 79.00, costPrice: 32.00, categoryId: "cat8",
    stock: 90, lowStockThreshold: 12, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=PowerBlock+96W", altText: "PowerBlock 96W", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-05-15T00:00:00Z",
  },
  {
    id: "p57", name: "ErgoStand Laptop Riser", sku: "ESR-1",
    description: "Aluminum laptop stand, adjustable height, foldable, ventilated",
    price: 69.00, costPrice: 22.00, categoryId: "cat8",
    stock: 75, lowStockThreshold: 10, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=ErgoStand", altText: "ErgoStand Laptop Riser", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-06-01T00:00:00Z",
  },
  {
    id: "p58", name: "VaultCase Travel Organizer", sku: "VCT-1",
    description: "Tech organizer pouch, cable compartments, water-resistant",
    price: 39.00, costPrice: 12.00, categoryId: "cat8",
    stock: 160, lowStockThreshold: 20, isActive: true,
    media: [{ type: "image", url: "https://placehold.co/600x400/2d2d44/eaeaea?text=VaultCase", altText: "VaultCase Travel Organizer", sortOrder: 1, isPrimary: true }],
    createdAt: "2025-06-01T00:00:00Z",
  },
];  