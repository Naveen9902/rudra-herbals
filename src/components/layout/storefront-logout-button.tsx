"use client"

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export function StorefrontLogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return (
    <button 
      onClick={handleLogout}
      className="hidden md:flex hover:text-[var(--terracotta-400)] transition-colors"
      title="Sign Out"
    >
      <LogOut className="h-5 w-5" />
    </button>
  )
}
