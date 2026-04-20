import type { UserRole } from "@/types/enums";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface JwtPayload {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}