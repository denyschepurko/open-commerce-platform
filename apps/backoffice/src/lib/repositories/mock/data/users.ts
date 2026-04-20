import type { User } from "@/types/user";

export const users: User[] = [
  {
    id: "u1",
    firstName: "Tomas",
    lastName: "Tomy",
    email: "admin@company.com",
    passwordHash: "$2b$10$1OmxDL.fM.St9hiff8avfubQr134kXe6nIQUKvnPWEFg/onFyEeze", //admin123
    role: "admin",
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "u2",
    firstName: "John",
    lastName: "Johny",
    email: "manager@company.com",
    passwordHash: "$2b$10$TD30lLDhm5dBE/I7645DUuIkqCzcOR0k.sEO0iYzcFKzrsRyt.i86", //manager123
    role: "manager",
    isActive: true,
    createdAt: "2025-02-01T00:00:00Z",
  },
  {
    id: "u3",
    firstName: "Sarah",
    lastName: "Sary",
    email: "support@company.com",
    passwordHash: "$2b$10$KpNKXvmkd.cyVM/RQZeBAeGPRypqsbwNEjkZUWV0Xad/pYGpVTroe", //support123
    role: "support",
    isActive: true,
    createdAt: "2025-03-01T00:00:00Z",
  },
];