"use client"

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export function AccountLogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return (
    <button 
      onClick={handleLogout}
      className="flex w-full items-center gap-3 px-4 py-2 text-sm font-medium text-white/50 hover:text-white transition-colors"
    >
      <LogOut className="h-4 w-4" /> Logout
    </button>
  )
}
