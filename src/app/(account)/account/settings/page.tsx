"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { updatePassword } from '@/app/actions/auth-actions'

export default function AccountSettingsPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const result = await updatePassword(formData)

    if (!result.success) {
      setError(result.error || "Failed to update password")
    } else {
      setSuccess(true)
      e.currentTarget.reset()
    }
    setLoading(false)
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header>
        <h1 className="font-serif text-4xl text-[var(--gold-400)] mb-2">Account Settings</h1>
        <p className="text-white/70">Manage your profile and security preferences.</p>
      </header>

      <Card className="bg-[var(--glass-panel)] backdrop-blur-md border-white/10 shadow-2xl rounded-2xl overflow-hidden text-white max-w-2xl">
        <CardHeader className="border-b border-white/10 pb-6">
          <CardTitle className="font-serif text-2xl text-[var(--gold-400)]">Security</CardTitle>
          <CardDescription className="text-white/60">Update your password to keep your sanctuary secure.</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="p-3 bg-red-900/30 border border-red-500/50 text-red-200 text-sm rounded-md">{error}</div>}
            {success && <div className="p-3 bg-green-900/30 border border-green-500/50 text-green-200 text-sm rounded-md">Password updated successfully!</div>}
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[var(--sage-tint)] mb-2 font-semibold">Current Password</label>
                <input
                  name="currentPassword"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 bg-black/40 border border-white/10 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--gold-400)] focus:border-[var(--gold-400)] transition-colors sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[var(--sage-tint)] mb-2 font-semibold">New Password</label>
                <input
                  name="newPassword"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 bg-black/40 border border-white/10 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--gold-400)] focus:border-[var(--gold-400)] transition-colors sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[var(--sage-tint)] mb-2 font-semibold">Confirm New Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 bg-black/40 border border-white/10 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--gold-400)] focus:border-[var(--gold-400)] transition-colors sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-[var(--gold-400)] text-[var(--noir-950)] hover:bg-[var(--gold-500)] font-semibold tracking-wider px-8"
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
