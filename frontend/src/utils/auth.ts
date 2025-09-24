import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

type TokenData = Record<string, unknown>;

export interface JwtPayloadExtended {
  userId: string;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_TOKEN_SECRET = process.env.AccessTokenSecretKey!;

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 10);
};

// Verify password
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await compare(password, hashedPassword);
};

// Generate access token — payload must be an object
export const generateAccessToken = (payload: { userId: string; role: string }) => {
  if (!ACCESS_TOKEN_SECRET) throw new Error("AccessTokenSecretKey is not defined");
  return sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

// Verify access token
export const verifyAccessToken = (token: string): JwtPayloadExtended | null => {
  try {
    if (!ACCESS_TOKEN_SECRET) throw new Error("AccessTokenSecretKey is not defined");
    return verify(token, ACCESS_TOKEN_SECRET) as JwtPayloadExtended;
  } catch (err) {
    console.error("Verify Access Token Error ->", err);
    return null;
  }
};

// Generate refresh token — payload must be an object (include role!)
export const generateRefreshToken = (payload: { userId: string; role: string }) => {
  if (!REFRESH_TOKEN_SECRET) throw new Error("RefreshTokenSecretKey is not defined");
  return sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "15d" });
};

export function verifyRefreshToken(token: string): JwtPayloadExtended | null {
  try {
    return verify(token, REFRESH_TOKEN_SECRET) as JwtPayloadExtended;
  } catch (err) {
    console.error("verifyRefreshToken error ->", err);
    return null;
  }
}

export async function setRefreshTokenCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function clearRefreshTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.set("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}