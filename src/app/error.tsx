"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="bg-[var(--forest-900)] text-[var(--ink-50)] min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h2 className="font-serif text-3xl md:text-4xl text-[var(--gold-400)] mb-4">An Imbalance Detected</h2>
      <p className="opacity-80 max-w-md mx-auto mb-10">
        We encountered a momentary disturbance in our systems. Please refresh the page or return to the shop.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>
          Try Again
        </Button>
      </div>
    </div>
  )
}
