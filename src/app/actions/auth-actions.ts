"use server"

import { prisma } from "@/lib/db"

export async function registerUser(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!name || !email || !password) {
      return { success: false, error: "All fields are required" }
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { success: false, error: "An account with this email already exists" }
    }

    // In a real application, you should hash the password using bcrypt.
    // We are using plain text here to match the simple setup in auth.ts.
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: password,
        role: "customer"
      }
    })

    return { success: true }
  } catch (error: any) {
    console.error("Registration error:", error)
    return { success: false, error: "Failed to register account" }
  }
}
