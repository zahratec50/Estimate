import UserModel from "@/models/User";
import connectToDB from "@/configs/db";
import { generateToken, verifyPassword } from "@/utils/auth";

export async function POST(req: any) {
  try {
    connectToDB();
    const body = await req.json()
    const { identifier, password } = body;

    if (!identifier.trim() || !password.trim()) {
      return Response.json(
        { message: "Data is not valid !!" },
        { status: 422 }
      );
    }

    const user = await UserModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return Response.json({ message: "User not found !!" }, { status: 404 });
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return Response.json(
        { message: "username or password is not correct !!" },
        { status: 422 }
      );
    }

    const token = generateToken({ email: user.email });
    return Response.json(
      { message: "User Logged In Successfully :))" },
      {
        status: 200,
        headers: { "Set-Cookie": `token=${token};path=/;httpOnly=true;` },
      }
    );
  } catch (err) {
    return Response.json(
      { message: "UnKnown Internal Server Error !!" },
      { status: 500 }
    );
  }
}
