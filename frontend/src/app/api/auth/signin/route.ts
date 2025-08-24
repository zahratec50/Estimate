// import {
//   generateAccessToken,
//   generateRefreshToken,
//   valiadteEmail,
//   valiadtePassword,
//   verifyPassword,
// } from "@/utils/auth";
// import UserModel from "@/models/User";
// import connectToDB from "@/configs/db";

// export async function POST(req) {
//   try {
//     connectToDB();
//     const body = await req.json();
//     const { email, password } = body;

//     // Validation
//     const isValidEmail = valiadteEmail(email);
//     const isValidPassword = valiadtePassword(password);

//     if (!isValidEmail || !isValidPassword) {
//       return Response.json(
//         { message: "email or password is invalid" },
//         { status: 419 }
//       );
//     }

//     const user = await UserModel.findOne({ email });

//     if (!user) {
//       return Response.json({ message: "User not found" }, { status: 422 });
//     }

//     const isCorrectPasswordWithHash = verifyPassword(password, user.password);

//     if (!isCorrectPasswordWithHash) {
//       return Response.json(
//         { message: "Email or password is not correct" },
//         { status: 401 }
//       );
//     }

//     const accessToken = generateAccessToken({ email });
//     const refreshToken = generateRefreshToken({ email });

//     await UserModel.findOneAndUpdate(
//       { email },
//       {
//         $set: {
//           refreshToken,
//         },
//       }
//     );

//     const headers = new Headers();
//     headers.append("Set-Cookie", `token=${accessToken};path=/;httpOnly=true;`);
//     headers.append(
//       "Set-Cookie",
//       `refresh-token=${refreshToken};path=/;httpOnly=true;`
//     );

//     return Response.json(
//       { message: "User logged in successfully :))" },
//       {
//         status: 200,
//         headers,
//       }
//     );
//   } catch (err) {
//     return Response.json(
//       { message: err },
//       {
//         status: 500,
//       }
//     );
//   }
// }

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/configs/db";
import { generateAccessToken, generateRefreshToken, setRefreshTokenCookie } from "@/utils/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    await setRefreshTokenCookie(refreshToken);

    return NextResponse.json({
      message: "Login successful",
      accessToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error: any) {
    return NextResponse.json({ message: "Signin failed", error: error.message }, { status: 500 });
  }
}
