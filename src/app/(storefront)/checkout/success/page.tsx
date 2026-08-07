"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, ChevronRight, Package } from "lucide-react"
import { useCartStore } from "@/lib/store/cart"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const clearCart = useCartStore((state) => state.clearCart)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Clear cart when successfully landing here
    if (sessionId) {
      clearCart()
    }
  }, [sessionId, clearCart])

  if (!mounted) return null

  return (
    <div className="bg-[var(--cream-50)] text-[var(--ink-900)] min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-12 rounded-2xl border border-[var(--border-subtle)] shadow-sm max-w-2xl w-full">
        <div className="w-20 h-20 bg-[var(--forest-900)] rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="h-10 w-10 text-[var(--gold-400)]" />
        </div>
        
        <h1 className="font-serif text-4xl text-[var(--forest-900)] mb-4">
          Order Confirmed
        </h1>
        <p className="opacity-80 mb-2">
          Your ritual is being prepared. We have sent a confirmation email with your receipt and tracking details.
        </p>
        <p className="text-sm font-semibold opacity-60 uppercase tracking-widest mb-10">
          Order ID: {sessionId ? sessionId.slice(0, 12).toUpperCase() : "MOCK-123"}
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <Button asChild className="w-full bg-[var(--forest-900)] text-[var(--ink-50)] hover:bg-[var(--forest-950)]">
            <Link href="/account/orders"><Package className="h-4 w-4 mr-2" /> Track Order</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/shop">Continue Exploring <ChevronRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
