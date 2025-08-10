// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import connectToDB from "@/configs/db";
// import { User } from "@/models/User";
// import {generateToken} from "@/utils/auth"

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
//     }

//     await connectToDB();

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     if (!user.password) {
//       return NextResponse.json({ message: "User password not set" }, { status: 400 });
//     }

//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//       return NextResponse.json({ message: "Invalid password" }, { status: 401 });
//     }

//     // ایجاد JWT
//     const token = generateToken({ email: user.email });

//     return NextResponse.json(
//       { message: "Login successful", token },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("Error in signin API:", error);
//     return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDB from "@/configs/db";
import { User } from "@/models/User";
import { generateToken, verifyPassword } from "@/utils/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.password) {
      return NextResponse.json(
        { message: "User password not set" },
        { status: 400 }
      );
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const token = generateToken({ userId: user._id });

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: { id: user._id, name: user.name, email: user.email },
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 روز
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
