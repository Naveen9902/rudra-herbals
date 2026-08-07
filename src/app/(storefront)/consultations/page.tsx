import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function LegalPage() {
  return (
    <div className="bg-[var(--forest-900)] text-[var(--ink-50)] min-h-screen py-32 px-6">
      <div className="mx-auto max-w-3xl text-center space-y-8">
        <h1 className="font-serif text-4xl text-[var(--gold-400)]">Information</h1>
        <p className="opacity-80">This page is currently being updated. Please check back later.</p>
        <Link href="/" className="inline-flex items-center text-[var(--terracotta-400)] hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" /> Return Home
        </Link>
      </div>
    </div>
  )
}
