import { hash, compare } from "bcryptjs";
import { sign, verify, JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

type TokenData = Record<string, unknown>;

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

// Verify password
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

// Generate access token
export const generateAccessToken = (data: TokenData): string => {
  const secret = process.env.AccessTokenSecretKey;
  if (!secret) {
    throw new Error("AccessTokenSecretKey is not defined in environment variables");
  }
  return sign({ ...data }, secret, { expiresIn: "60s" });
};

// Verify access token
export const verifyAccessToken = (
  token: string
): JwtPayload | string | false => {
  try {
    const secret = process.env.AccessTokenSecretKey;
    if (!secret) {
      throw new Error("AccessTokenSecretKey is not defined in environment variables");
    }
    return verify(token, secret);
  } catch (err) {
    console.error("Verify Access Token Error ->", err);
    return false;
  }
};

// Generate refresh token
export const generateRefreshToken = (data: TokenData): string => {
  const secret = process.env.RefreshTokenSecretKey;
  if (!secret) {
    throw new Error("RefreshTokenSecretKey is not defined in environment variables");
  }
  return sign({ ...data }, secret, { expiresIn: "15d" });
};

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

// Validate email
export const validateEmail = (email: string): boolean => {
  const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
  return pattern.test(email);
};

// Validate phone
export const validatePhone = (phone: string): boolean => {
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
  return pattern.test(phone);
};

// Validate password
export const validatePassword = (password: string): boolean => {
  const pattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
  return pattern.test(password);
};
