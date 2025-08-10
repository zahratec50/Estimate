// import type { JWT } from "next-auth/jwt";
// import type { Account, Session } from "next-auth";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "next-auth/providers/apple";
// import { generateAppleClientSecret } from "@/utils/appleClientSecret";
// import { User } from "@/models/User";
// import connectToDB from "@/configs/db";

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
//         const user = await User.findOne({ email: credentials?.email });
//         // اینجا باید رمز رو هم چک کنی
//         return user || null;
//       },
//     }),
//   ],
//   // Secret used to encrypt JWT tokens and sessions
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     // Called whenever a JWT token is created or updated
//     async jwt({ token, account }: { token: JWT; account?: Account | null }) {
//       if (account) {
//         // Save access token from provider to JWT token
//         token.accessToken = account.access_token;
//       }
//       return token;
//     },
//     // Called whenever a session is checked
//     async session({ session, token }: { session: Session; token: JWT  }) {
//       // Attach accessToken to session object so it can be accessed client-side
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },
// };

// // Next.js 13 App Router route handlers for GET and POST
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


// import type { JWT } from "next-auth/jwt";
// import type { Account, Session, User as NextAuthUser } from "next-auth";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "next-auth/providers/apple";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { generateAppleClientSecret } from "@/utils/appleClientSecret";
// import { User } from "@/models/User";
// import connectToDB from "@/configs/db";
// import bcrypt from "bcryptjs";

// // =====================
// // NextAuth Configuration
// // =====================
// export const authOptions = {
//   providers: [
//     // Google Login
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),

//     // Apple Login
//     AppleProvider({
//       clientId: process.env.APPLE_ID_CLIENT_ID!,
//       clientSecret: generateAppleClientSecret(),
//     }),

//     // Email + Password Login
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         await connectToDB();

//         if (!credentials?.email || !credentials?.password) return null;

//         const user = await User.findOne({ email: credentials.email });
//         if (!user || !user.password) return null;

//         const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isPasswordValid) return null;

//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//           image: user.image,
//         };
//       },
//     }),
//   ],

//   secret: process.env.NEXTAUTH_SECRET,

//   callbacks: {
//     // Save extra data in JWT
//     async jwt({ token, account, user }: { token: JWT; account?: Account | null; user?: NextAuthUser }) {
//       if (account && user) {
//         token.accessToken = account.access_token;

//         await connectToDB();
//         const existingUser = await User.findOne({ email: user.email });

//         if (!existingUser) {
//           await User.create({
//             name: user.name,
//             email: user.email,
//             image: user.image,
//             password: null, // Social login has no password
//           });
//         }

//         token.id = existingUser?._id?.toString() || user.id;
//       }
//       return token;
//     },

//     // Attach token data to session
//     async session({ session, token }: { session: Session & { accessToken?: string; user?: any }; token: JWT }) {
//       session.accessToken = token.accessToken as string;
//       session.user.id = token.id;
//       return session;
//     },
//   },
// };

// // Next.js 13 Route Handlers
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// import type { JWT } from "next-auth/jwt";
// import type { Account, Session, User as NextAuthUser } from "next-auth";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "next-auth/providers/apple";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { generateAppleClientSecret } from "@/utils/appleClientSecret";
// import { User } from "@/models/User";
// import connectToDB from "@/configs/db";

// // Custom type for DB user
// interface DBUser {
//   _id: string;
//   name?: string;
//   email?: string;
//   image?: string;
// }

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
//         const user = await User.findOne({ email: credentials?.email });
//         // Here you should also verify password
//         return user as unknown as DBUser || null;
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     // Called whenever a JWT token is created or updated
//     async jwt({ token, account, user }: { token: JWT; account?: Account | null; user?: NextAuthUser }) {
//       if (account) {
//         token.accessToken = account.access_token;
//       }

//       if (user) {
//         // Try to get user ID from DB
//         const existingUser = user as unknown as DBUser;
//         if (existingUser && existingUser._id) {
//           token.id = existingUser._id;
//         }
//       }

//       return token;
//     },

//     // Called whenever a session is checked
//     async session({ session, token }: { session: Session; token: JWT }) {
//       session.accessToken = token.accessToken as string | undefined;
//       session.user.id = token.id as string;
//       return session;
//     },
//   },
// };

// // Next.js 13 App Router route handlers for GET and POST
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


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
