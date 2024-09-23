import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { v4 as uuidv4 } from "uuid";
import { ZodError } from "zod";

import { authSchema } from "@/schemas/auth-schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials) {
        try {
          const { name, password } = await authSchema.parseAsync(credentials);

          if (
            name === process.env.NEXT_PUBLIC_AUTH_NAME &&
            password === process.env.NEXT_PUBLIC_AUTH_PASSWORD
          ) {
            return { id: uuidv4(), name: name };
          }

          return null;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }

          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
      }

      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/",
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
});
