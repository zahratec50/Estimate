import { NextResponse } from "next/server";
import { getAdmin } from "@/utils/getAdmin";
import { connectDB } from "@/configs/db"; // مسیرت رو بررسی کن
import User, { IUser } from "@/models/User";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

export async function GET() {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  return NextResponse.json({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    avatar: admin.avatar ?? null,
  });
}

export async function PUT(req: Request) {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const avatarFile = formData.get("avatar") as any; // File-like (server-side)

    if (!name || !email) {
      return NextResponse.json({ message: "Name and email are required" }, { status: 400 });
    }

    const updateData: Partial<Record<string, any>> = { name, email };

    // ذخیره آواتار اگر ارسال شده
    if (avatarFile && avatarFile.size > 0) {
      const buffer = Buffer.from(await avatarFile.arrayBuffer());
      const ext = avatarFile.name?.split(".").pop() ?? "png";
      const fileName = `avatar-${nanoid()}.${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      updateData.avatar = `/uploads/${fileName}`;
    }

    await connectDB();
    // آپدیت با id ای که از getAdmin() برگشته (string)
    const updated = await User.findByIdAndUpdate(admin.id, updateData, { new: true }).lean<IUser>().exec();

    return NextResponse.json({
      message: "Profile updated successfully",
      admin: {
        id: updated ? String((updated as any)._id) : admin.id,
        name: updated?.name ?? name,
        email: updated?.email ?? email,
        avatar: updated?.avatar ?? updateData.avatar ?? admin.avatar,
      },
    });
  } catch (err) {
    console.error("PUT /api/admin/me error:", err);
    return NextResponse.json({ message: (err as any)?.message ?? "Failed to save profile" }, { status: 500 });
  }
}
