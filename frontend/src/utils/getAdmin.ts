//(Server-side utility)
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import User from "@/models/User";
import { connectDB } from "@/configs/db"; // اگر مسیرت فرق داره اینو عوض کن

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export type AdminSummary = {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role?: string;
};

export async function getAdmin(): Promise<AdminSummary | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(REFRESH_TOKEN_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // payload ممکنه id در کلیدهای مختلف باشه؛ چند حالت را تست می‌کنیم
    const id =
      (payload as any).id ??
      (payload as any).sub ??
      (payload as any).userId ??
      undefined;
    const role = (payload as any).role as string | undefined;

    if (!id || role !== "admin") return null;

    await connectDB();
    // lean() برمی‌گرداند plain object (نه سند Mongoose)، ولی برای اطمینان exec اضافه شد
    const adminDoc = await User.findById(id).lean().exec();

    if (!adminDoc || Array.isArray(adminDoc)) return null;

    return {
      id: String((adminDoc as any)._id),
      name: (adminDoc as any).name,
      email: (adminDoc as any).email,
      avatar: (adminDoc as any).avatar ?? null,
      role: (adminDoc as any).role,
    };
  } catch (err) {
    console.error("getAdmin error:", err);
    return null;
  }
}
