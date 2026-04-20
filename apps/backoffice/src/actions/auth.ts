"use server";

import { redirect } from "next/navigation";
import { login, logout } from "@/lib/auth";

export async function loginAction(_prevState: { error: string } | null, formData: FormData): Promise<{ error: string } | null> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = formData.get("redirect") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const result = await login(email, password);

  if (result.error) {
    return { error: result.error };
  }

  redirect(redirectTo || "/dashboard");
}

export async function logoutAction() {
  await logout();
  redirect("/login");
}