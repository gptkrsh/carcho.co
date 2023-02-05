import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  adapter: PrismaAdapter(prisma),
};

export default NextAuth(authOptions);
