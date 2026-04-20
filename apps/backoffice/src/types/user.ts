import { UserRole } from "./enums";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}
