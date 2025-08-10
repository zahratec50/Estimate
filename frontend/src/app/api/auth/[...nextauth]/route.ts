// import type { JWT } from "next-auth/jwt";
// import type { Account, Session, User as NextAuthUser } from "next-auth";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "next-auth/providers/apple";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { generateAppleClientSecret } from "@/utils/appleClientSecret";
// import { User } from "@/models/User";
// import connectToDB from "@/configs/db";
// import { Document, Types } from "mongoose";

// export interface DBUser extends Document {
//   _id: Types.ObjectId;
//   name?: string;
//   email?: string;
//   image?: string;
//   password?: string;
// }

// const appleProviderEnabled =
//   process.env.APPLE_ID_CLIENT_ID &&
//   process.env.APPLE_TEAM_ID &&
//   process.env.APPLE_KEY_ID &&
//   process.env.APPLE_PRIVATE_KEY;

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     AppleProvider({
//       clientId: process.env.APPLE_ID_CLIENT_ID!,
//       clientSecret: generateAppleClientSecret(),
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         await connectToDB();
//         const user = await User.findOne({ email: credentials?.email }) as DBUser | null;
//         // TODO: password verification
//         if (!user) return null;

//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//           image: user.image,
//         } as NextAuthUser;
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async jwt({ token, account, user }: { token: JWT; account?: Account | null; user?: NextAuthUser }) {
//       if (account) {
//         token.accessToken = account.access_token;
//       }
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },

//     async session({ session, token }: { session: Session; token: JWT }) {
//       session.accessToken = token.accessToken;
//       if (session.user) {
//         session.user.id = token.id!;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/models/User";
import connectToDB from "@/configs/db";
import { verifyPassword } from "@/utils/auth";
import type { JWT } from "next-auth/jwt";
import type { DefaultUser } from "next-auth";
import type { Account, Session, User as NextAuthUser } from "next-auth";
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

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectToDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password) return null;

        const isValidPassword = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValidPassword) return null;

        // این شیء اطلاعاتی است که در session در دسترس است
        const dbUser = user as DBUser;
        return {
          id: dbUser._id.toString(),
          name: dbUser.name,
          email: dbUser.email,
          image: dbUser.image || null,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: DefaultUser | undefined;
      account?: any;
    }) {
      if (user && user.id) {
        token.id = user.id;
      }
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login", // آدرس صفحه ورود اختصاصی (اختیاری)
    error: "/auth/error", // صفحه خطا (اختیاری)
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
