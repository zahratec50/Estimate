// import connectToDB from "@/configs/db";
// import { verifyAccessToken } from "@/utils/auth";
// import { cookies } from "next/headers";
// import UserModel from "@/models/User";

// export async function GET(req) {
//   connectToDB();
//   const token = cookies().get("token");
//   let user = null;

//   if (token) {
//     const tokenPayload = verifyAccessToken(token.value);
//     if (tokenPayload) {
//       user = await UserModel.findOne(
//         { email: tokenPayload.email },
//         "-password -refreshToken -__v"
//       );
//     }

//     return Response.json(user);
//   } else {
//     return Response.json(
//       {
//         data: null,
//         message: "Not access !!",
//       },
//       { status: 401 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as { userId: string };
    return NextResponse.json({ userId: decoded.userId });
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }
}
