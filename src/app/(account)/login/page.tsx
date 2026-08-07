"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid credentials")
    } else {
      router.push("/account")
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--forest-950)] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--sage-tint)]/10 to-transparent pointer-events-none" />

      <div className="max-w-md w-full space-y-8 relative z-10 bg-[var(--forest-900)] p-10 rounded-2xl border border-[var(--border-subtle)] shadow-xl">
        <div>
          <h2 className="mt-2 text-center text-3xl font-serif font-extrabold text-[var(--gold-400)] tracking-wide">
            Welcome Back
          </h2>
          <p className="mt-3 text-center text-sm text-[var(--sage-tint)] opacity-80">
            Sign in to access your Rudra Herbals account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="p-3 bg-red-900/30 border border-red-500/50 text-red-200 text-sm text-center rounded-md">{error}</div>}
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[var(--sage-tint)] mb-2 font-semibold">Email</label>
              <input
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-[var(--forest-950)] border border-[var(--border-subtle)] placeholder-gray-500 text-[var(--ink-50)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--terracotta-400)] focus:border-[var(--terracotta-400)] transition-colors sm:text-sm"
                placeholder="customer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase tracking-widest rounded-md text-[var(--forest-950)] bg-[var(--gold-400)] hover:bg-[var(--gold-500)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--gold-400)] focus:ring-offset-[var(--forest-900)] transition-all shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
