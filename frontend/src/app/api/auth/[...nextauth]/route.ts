import type { JWT } from "next-auth/jwt";
import type { Account, Session, User as NextAuthUser } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import { generateAppleClientSecret } from "@/utils/appleClientSecret";
import { User } from "@/models/User";
import connectToDB from "@/configs/db";
import { Document, Types } from "mongoose";

export interface DBUser extends Document {
  _id: Types.ObjectId;
  name?: string;
  email?: string;
  image?: string;
  password?: string;
}


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID_CLIENT_ID!,
      clientSecret: generateAppleClientSecret(),
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();
        const user = await User.findOne({ email: credentials?.email }) as DBUser | null;
        // TODO: password verification
        if (!user) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        } as NextAuthUser;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }: { token: JWT; account?: Account | null; user?: NextAuthUser }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken;
      if (session.user) {
        session.user.id = token.id!;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
