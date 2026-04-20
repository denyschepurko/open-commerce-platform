import jwt from "jsonwebtoken";
import type { JwtPayload } from "./types";
import { JWT_EXPIRES_IN } from "./constants";

const SECRET = process.env.JWT_SECRET!;

export function createToken(payload: Omit<JwtPayload, "iat" | "exp">): string {
  return jwt.sign(payload, SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch {
    return null;
  }
}