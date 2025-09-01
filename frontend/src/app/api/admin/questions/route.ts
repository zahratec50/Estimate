import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import Question from "@/models/Question";
import { z, ZodError } from "zod";

// Schema for POST and PUT validation
const questionSchema = z.object({
  questionText: z.string().min(5, "Question must be at least 5 characters."),
  questionType: z.enum(["text", "number", "select", "checkbox", "radio", "button"]),
  category: z.enum(["bathroom", "kitchen", "living_room", "bedroom", "other"]),
  targetUser: z.enum(["homeowner", "contractor", "architect", "other"]),
  options: z.array(z.string().min(1)).optional(),
  selectionMode: z.enum(["single", "multiple"]).optional(),
});

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Validate request body
    const validatedData = questionSchema.parse(body);

    // Create question in database
    const question = await Question.create(validatedData);

    return NextResponse.json(
      {
        message: "Question created successfully",
        question,
      },
      { status: 201, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.issues },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }
    return NextResponse.json(
      { message: "Failed to create question", error: error.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const targetUser = searchParams.get("targetUser");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const filter: any = {};
    if (category) filter.category = category;
    if (targetUser) filter.targetUser = targetUser;

    const total = await Question.countDocuments(filter);
    const questions = await Question.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json(
      {
        questions,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch questions", error: error.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "Question ID is required" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const body = await req.json();
    const validatedData = questionSchema.parse(body);

    const question = await Question.findByIdAndUpdate(id, validatedData, { new: true });
    if (!question) {
      return NextResponse.json(
        { message: "Question not found" },
        { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    return NextResponse.json(
      { message: "Question updated successfully", question },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.issues },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }
    return NextResponse.json(
      { message: "Failed to update question", error: error.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "Question ID is required" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      return NextResponse.json(
        { message: "Question not found" },
        { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    return NextResponse.json(
      { message: "Question deleted successfully" },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to delete question", error: error.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function OPTIONS(req: Request) {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}