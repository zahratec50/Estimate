import { NextResponse } from "next/server";
import formidable, { File as FormidableFile } from "formidable";
import fs from "fs";
import path from "path";

// غیر فعال کردن bodyParser پیش‌فرض Next.js
export const config = {
  api: { bodyParser: false },
};

// مسیر ذخیره فایل‌ها
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

export async function POST(req: Request) {
  return new Promise<NextResponse>((resolve) => {
    const form = formidable({
      multiples: false,
      uploadDir,
      keepExtensions: true,
      filename: (name, ext, part) => {
        // نام فایل امن و یکتا
        const timestamp = Date.now();
        const safeName = part.originalFilename?.replace(/\s+/g, "_") || "file";
        return `${timestamp}-${safeName}`;
      },
    });

    form.parse(req as any, (err, fields, files) => {
      if (err) return resolve(NextResponse.json({ error: "Upload failed" }, { status: 500 }));

      const uploaded = files.file;
      if (!uploaded) return resolve(NextResponse.json({ error: "No file uploaded" }, { status: 400 }));

      // اگر آرایه بود، اولین فایل را انتخاب کن
      const file: FormidableFile = Array.isArray(uploaded) ? uploaded[0] : uploaded;

      // URL فایل برای استفاده در کامپوننت
      const fileUrl = `/uploads/${file.newFilename}`;

      resolve(NextResponse.json({ url: fileUrl }));
    });
  });
}
