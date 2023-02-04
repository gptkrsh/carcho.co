import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { AuthOptions } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER as string
    })
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  adapter: PrismaAdapter(prisma)
}

export default NextAuth(authOptions)
