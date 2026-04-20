import type { Category } from "@/types/product";

export const categories: Category[] = [
  { id: "cat1", name: "Laptops",     slug: "laptops",     description: "Portable computers and ultrabooks",  sortOrder: 1, isActive: true },
  { id: "cat2", name: "Smartphones", slug: "smartphones", description: "Mobile phones and accessories",      sortOrder: 2, isActive: true },
  { id: "cat3", name: "Tablets",     slug: "tablets",     description: "Tablet devices and e-readers",       sortOrder: 3, isActive: true },
  { id: "cat4", name: "Audio",       slug: "audio",       description: "Headphones, speakers, and earbuds",  sortOrder: 4, isActive: true },
  { id: "cat5", name: "Wearables",   slug: "wearables",   description: "Smartwatches and fitness trackers",  sortOrder: 5, isActive: true },
  { id: "cat6", name: "Desktops",    slug: "desktops",    description: "Desktop computers and workstations", sortOrder: 6, isActive: true },
  { id: "cat7", name: "Monitors",    slug: "monitors",    description: "Displays and monitors",              sortOrder: 7, isActive: true },
  { id: "cat8", name: "Accessories", slug: "accessories", description: "Cables, cases, and peripherals",     sortOrder: 8, isActive: true },
];