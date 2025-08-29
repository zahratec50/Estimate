// app/api/admin/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User, { IUser } from "@/models/User";
import { connectDB } from "@/configs/db";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

const JWT_SECRET = process.env.AccessTokenSecretKey!;

// گرفتن ادمین از توکن و بررسی رول
async function getAdminFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    await connectDB();

    const admin = await User.findById(decoded.id);
    if (!admin) return null;
    if (admin.role !== "admin") return null; // فقط ادمین

    return admin;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}

// GET: گرفتن اطلاعات ادمین
export async function GET() {
  const admin = await getAdminFromToken();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    id: admin._id,
    name: admin.name,
    email: admin.email,
    avatarUrl: admin.avatar || null,
  });
}

// PUT: به‌روزرسانی پروفایل ادمین
export async function PUT(req: Request) {
  const admin = await getAdminFromToken();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const avatarFile = formData.get("avatar") as File | null;

    if (!name || !email) {
      return NextResponse.json({ message: "Name and email are required" }, { status: 400 });
    }

    const updateData: Partial<IUser> = { name, email };

    // ذخیره آواتار
    if (avatarFile && avatarFile.size > 0) {
      const buffer = Buffer.from(await avatarFile.arrayBuffer());
      const ext = avatarFile.name.split(".").pop();
      const fileName = `avatar-${nanoid()}.${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);
      updateData.avatar = `/uploads/${fileName}`;
    }

    const updatedAdmin = await User.findByIdAndUpdate(admin._id, updateData, { new: true });

    return NextResponse.json({
      message: "Profile updated successfully",
      admin: {
        id: updatedAdmin!._id,
        name: updatedAdmin!.name,
        email: updatedAdmin!.email,
        avatarUrl: updatedAdmin!.avatar,
      },
    });
  } catch (err) {
    console.error("PUT /api/admin/me error:", err);
    return NextResponse.json({ message: "Failed to save profile" }, { status: 500 });
  }
}
