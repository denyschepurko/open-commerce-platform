import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { ROUTES } from "@/lib/routes";
import { AUTH_COOKIE_NAME } from "@/lib/auth/constants";

const JWT_SECRET = process.env.JWT_SECRET!;

function isValidToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL(ROUTES.LOGIN, request.url);
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

function clearTokenAndRedirectToLogin(request: NextRequest): NextResponse {
  const response = redirectToLogin(request);
  response.cookies.delete(AUTH_COOKIE_NAME);
  return response;
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isLoginPage = request.nextUrl.pathname.startsWith(ROUTES.LOGIN);

  if (isLoginPage && token && isValidToken(token)) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  if (isLoginPage) {
    return NextResponse.next();
  }

  if (!token) {
    return redirectToLogin(request);
  }

  if (!isValidToken(token)) {
    return clearTokenAndRedirectToLogin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};