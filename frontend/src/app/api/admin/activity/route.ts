import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import AdminActivity, { IAdminActivity } from "@/models/admin/AdminActivity";
import { FilterQuery } from "mongoose";

interface Query {
  search?: string;
  page?: string;
  limit?: string;
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { search, page = "1", limit = "10" } = Object.fromEntries(new URL(req.url).searchParams) as Query;
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    const filter: FilterQuery<IAdminActivity> = {};
    if (search) {
      filter.$or = [
        { adminName: { $regex: search, $options: "i" } },
        { action: { $regex: search, $options: "i" } },
        { targetType: { $regex: search, $options: "i" } },
      ];
    }

    const totalDocuments = await AdminActivity.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / pageSize); // محاسبه تعداد کل صفحات
    const activities = await AdminActivity.find(filter)
      .sort({ timestamp: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    return NextResponse.json({ activities, totalPages });
  } catch (error) {
    console.error("Error in GET /api/admin/activity:", error);
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const activity = await AdminActivity.create(data);
    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/admin/activity:", error);
    return NextResponse.json({ error: "Failed to create activity" }, { status: 500 });
  }
}