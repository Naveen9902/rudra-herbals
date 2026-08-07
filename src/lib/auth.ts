import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
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

        // Check the database for regular users
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        
        if (user) {
          const isMatch = await bcrypt.compare(credentials.password, user.passwordHash)
          
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          }
          
          // Legacy migration: If plain text matches, hash it and save it silently
          if (user.passwordHash === credentials.password) {
            const hashed = await bcrypt.hash(credentials.password, 10)
            await prisma.user.update({
              where: { id: user.id },
              data: { passwordHash: hashed }
            })
            
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          }
        }
        
        return null
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 100 * 365 * 24 * 60 * 60, // 100 years globally (effectively "lifetime" for admin)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.createdAt = Date.now()
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
      }

      const isUserAdmin = token.role === 'admin'
      const ageMs = Date.now() - ((token.createdAt as number) || Date.now())
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000

      // If normal user and older than 7 days, invalidate session
      if (!isUserAdmin && ageMs > sevenDaysMs) {
        return {} as any
      }

      return session
    }
  },
  pages: {
    signIn: "/login",
  }
}
