"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { registerUser } from "@/app/actions/auth-actions"

export default function Register() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const result = await registerUser(formData)

    if (!result.success) {
      setError(result.error || "Something went wrong")
      setLoading(false)
    } else {
      router.push("/login?registered=true")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--forest-950)] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--sage-tint)]/10 to-transparent pointer-events-none" />

      <div className="max-w-md w-full space-y-8 relative z-10 bg-[var(--forest-900)] p-10 rounded-2xl border border-[var(--border-subtle)] shadow-xl">
        <div>
          <h2 className="mt-2 text-center text-3xl font-serif font-extrabold text-[var(--gold-400)] tracking-wide">
            Join the Sanctuary
          </h2>
          <p className="mt-3 text-center text-sm text-[var(--sage-tint)] opacity-80">
            Create an account to begin your journey
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="p-3 bg-red-900/30 border border-red-500/50 text-red-200 text-sm text-center rounded-md">{error}</div>}
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[var(--sage-tint)] mb-2 font-semibold">Name</label>
              <input
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-[var(--forest-950)] border border-[var(--border-subtle)] placeholder-gray-500 text-[var(--ink-50)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--terracotta-400)] focus:border-[var(--terracotta-400)] transition-colors sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[var(--sage-tint)] mb-2 font-semibold">Email</label>
              <input
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-[var(--forest-950)] border border-[var(--border-subtle)] placeholder-gray-500 text-[var(--ink-50)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--terracotta-400)] focus:border-[var(--terracotta-400)] transition-colors sm:text-sm"
                placeholder="customer@example.com"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[var(--sage-tint)] mb-2 font-semibold">Password</label>
              <input
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-[var(--forest-950)] border border-[var(--border-subtle)] placeholder-gray-500 text-[var(--ink-50)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--terracotta-400)] focus:border-[var(--terracotta-400)] transition-colors sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase tracking-widest rounded-md text-[var(--forest-950)] bg-[var(--gold-400)] hover:bg-[var(--gold-500)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--gold-400)] focus:ring-offset-[var(--forest-900)] transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-[var(--sage-tint)]">
              Already have an account?{" "}
              <Link href="/login" className="text-[var(--gold-400)] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
