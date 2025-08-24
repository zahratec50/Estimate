// import connectToDB from "@/configs/db";
// import UserModel from "@/models/User";
// import { generateAccessToken, hashPassword } from "@/utils/auth";
// import { roles } from "@/utils/constants";

// export async function POST(req) {
//   connectToDB();
//   const body = await req.json();
//   const { name, phone, email, password } = body;

//   // Validation (You)

//   const isUserExist = await UserModel.findOne({
//     $or: [{ name }, { email }, { phone }],
//   });

//   if (isUserExist) {
//     return Response.json(
//       {
//         message: "The username or email or phone exist already !!",
//       },
//       {
//         status: 422,
//       }
//     );
//   }

//   const hashedPassword = await hashPassword(password);
//   const accessToken = generateAccessToken({ name });

//   const users = await UserModel.find({});

//   await UserModel.create({
//     name,
//     email,
//     phone,
//     password: hashedPassword,
//     role: users.length > 0 ? roles.USER : roles.ADMIN,
//   });

//   return Response.json(
//     { message: "User signed up successfully :))" },
//     {
//       status: 201,
//       headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` },
//     }
//   );
// }

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/configs/db";
import { generateAccessToken, generateRefreshToken, setRefreshTokenCookie } from "@/utils/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    await setRefreshTokenCookie(refreshToken);

    return NextResponse.json({
      message: "User registered successfully",
      accessToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error: any) {
    return NextResponse.json({ message: "Signup failed", error: error.message }, { status: 500 });
  }
}
