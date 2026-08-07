import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        
        // For production, you should hash and compare passwords using bcrypt.
        // For this example to be ready to deploy quickly, we'll check against env variables 
        // or a default admin if it exists.
        
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@rudraherbals.com'
        const adminPassword = process.env.ADMIN_PASSWORD || 'password123'
        
        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          return {
            id: 'admin-id',
            name: 'Admin',
            email: adminEmail,
            role: 'admin'
          }
        }

        // Alternative: check the database
        // const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        // if (user && user.passwordHash === credentials.password && user.role === 'admin') {
        //   return user
        // }
        
        return null
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: "/admin/login",
  }
}
