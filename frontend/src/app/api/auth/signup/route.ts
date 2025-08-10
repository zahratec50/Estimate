import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import { User } from "@/models/User";
import { hashPassword } from "@/utils/auth";

export async function POST(req: Request) {
  try {
    console.log("Signup API called")
    const { name, email, password } = await req.json();
    console.log("Received:", { name, email, password });

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email and password are required" },
        { status: 400 }
      );
    }

    await connectToDB();
    console.log("Connected to DB");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    console.log("Password hashed");

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User registered successfully", userId: newUser._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in register API:", error);
    return NextResponse.json({ message: "Something went wrong", error: String(error) }, { status: 500 });
  }
}
