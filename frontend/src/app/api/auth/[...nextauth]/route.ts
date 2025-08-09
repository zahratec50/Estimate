import type { JWT } from "next-auth/jwt";
import type { Account, Session, User } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { generateAppleClientSecret } from "@/utils/appleClientSecret";

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
  ],
  // Secret used to encrypt JWT tokens and sessions
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Called whenever a JWT token is created or updated
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      if (account) {
        // Save access token from provider to JWT token
        token.accessToken = account.access_token;
      }
      return token;
    },
    // Called whenever a session is checked
    async session({ session, token }: { session: Session; token: JWT  }) {
      // Attach accessToken to session object so it can be accessed client-side
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

// Next.js 13 App Router route handlers for GET and POST
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
