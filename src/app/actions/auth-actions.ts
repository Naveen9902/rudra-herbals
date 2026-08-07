"use server"

import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

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

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        role: "customer"
      }
    })

    return { success: true }
  } catch (error: any) {
    console.error("Registration error:", error)
    return { success: false, error: "Failed to register account" }
  }
}

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function updatePassword(formData: FormData) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return { success: false, error: "Unauthorized" }
    }

    const currentPassword = formData.get("currentPassword") as string
    const newPassword = formData.get("newPassword") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (!currentPassword || !newPassword || !confirmPassword) {
      return { success: false, error: "All fields are required" }
    }

    if (newPassword !== confirmPassword) {
      return { success: false, error: "New passwords do not match" }
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return { success: false, error: "User not found" }
    }

    // Verify current password with bcrypt, fallback to plaintext for legacy migration
    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash)
    
    if (!isMatch && user.passwordHash !== currentPassword) {
      return { success: false, error: "Incorrect current password" }
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: hashedNewPassword }
    })

    return { success: true }
  } catch (error: any) {
    console.error("Password update error:", error)
    return { success: false, error: "Failed to update password" }
  }
}
