// import UserModel from "@/models/User";
// import connectToDB from "@/configs/db";
// import { generateToken, verifyPassword } from "@/utils/auth";

// export async function POST(req: any) {
//   try {
//     connectToDB();
//     const body = await req.json()
//     const { identifier, password } = body;

//     if (!identifier.trim() || !password.trim()) {
//       return Response.json(
//         { message: "Data is not valid !!" },
//         { status: 422 }
//       );
//     }

//     const user = await UserModel.findOne({
//       $or: [{ username: identifier }, { email: identifier }],
//     });

//     if (!user) {
//       return Response.json({ message: "User not found !!" }, { status: 404 });
//     }

//     const isValidPassword = await verifyPassword(password, user.password);

//     if (!isValidPassword) {
//       return Response.json(
//         { message: "username or password is not correct !!" },
//         { status: 422 }
//       );
//     }

//     const token = generateToken({ email: user.email });
//     return Response.json(
//       { message: "User Logged In Successfully :))" },
//       {
//         status: 200,
//         headers: { "Set-Cookie": `token=${token};path=/;httpOnly=true;` },
//       }
//     );
//   } catch (err) {
//     return Response.json(
//       { message: "UnKnown Internal Server Error !!" },
//       { status: 500 }
//     );
//   }
// }
// app/api/auth/signin/route.ts
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import connectToDB from "@/configs/db";
// import { User } from "@/models/User";

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

//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//       return NextResponse.json({ message: "Invalid password" }, { status: 401 });
//     }

//     // اینجا می‌تونی JWT بسازی یا سشن ایجاد کنی
//     // برای نمونه فقط پیام موفقیت می‌فرستیم
//     return NextResponse.json({ message: "Login successful", userId: user._id }, { status: 200 });
//   } catch (error) {
//     console.error("Error in signin API:", error);
//     return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
//   }
// }
