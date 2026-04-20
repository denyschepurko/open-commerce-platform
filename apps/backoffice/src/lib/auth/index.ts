import { cache } from "react";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { userRepository } from "@/lib/repositories";
import { createToken, decodeToken } from "./jwt";
import { AUTH_COOKIE_NAME, COOKIE_MAX_AGE } from "./constants";
import type { AuthUser } from "./types";

export const getCurrentUser = cache(async (): Promise<AuthUser | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);

  if (!token) return null;

  const payload = decodeToken(token.value);
  if (!payload) return null;

  return {
    id: payload.userId,
    firstName: payload.firstName,
    lastName: payload.lastName,
    fullName: payload.firstName + " " + payload.lastName,
    email: payload.email,
    role: payload.role,
  };
});

export async function login(email: string, password: string): Promise<{ error: string | null } > {
  const user = await userRepository.findByEmail(email);
  if (!user) return { error: "Invalid email or password" };
  if (!user.isActive) return { error: "Account is deactivated" };
  if (!user.passwordHash) return { error: "Invalid email or password" };

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) return { error: "Invalid email or password" };

  const token = createToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName
  });

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  
  return {error: null};
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export type { AuthUser };