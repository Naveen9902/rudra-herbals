"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lock, ChevronRight, CheckCircle2 } from "lucide-react"

import { useCartStore } from "@/lib/store/cart"
import { Button } from "@/components/ui/button"

export default function CheckoutPage() {
  const router = useRouter()
  const cart = useCartStore()
  const [mounted, setMounted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (cart.items.length === 0) {
    router.push("/cart")
    return null
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart.items }),
      })
      const data = await res.json()
      
      if (data.url) {
        // If Stripe returns a URL, go there (or to our mock success)
        window.location.href = data.url
      }
    } catch (error) {
      console.error(error)
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-[var(--cream-50)] text-[var(--ink-900)] min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-20 grid lg:grid-cols-12 gap-16">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-7 space-y-12">
          
          <header>
            <h1 className="font-serif text-3xl md:text-4xl text-[var(--forest-900)] mb-4">
              Secure Checkout
            </h1>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60">
              <span className="text-[var(--terracotta-400)]">Information</span>
              <ChevronRight className="h-3 w-3" />
              <span>Shipping</span>
              <ChevronRight className="h-3 w-3" />
              <span>Payment</span>
            </div>
          </header>

          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-10">
            {/* Contact Info */}
            <section className="space-y-6">
              <h2 className="font-serif text-xl border-b border-[var(--ink-900)]/10 pb-4">Contact Information</h2>
              <div className="space-y-4">
                <input required type="email" placeholder="Email Address" className="w-full bg-white border border-[var(--border-subtle)] px-4 py-3 rounded-lg focus:outline-none focus:border-[var(--terracotta-400)] text-sm" />
                <label className="flex items-center gap-2 text-sm opacity-80 cursor-pointer">
                  <input type="checkbox" className="rounded text-[var(--terracotta-400)]" defaultChecked />
                  Email me with news and offers
                </label>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="space-y-6">
              <h2 className="font-serif text-xl border-b border-[var(--ink-900)]/10 pb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="First Name" className="w-full bg-white border border-[var(--border-subtle)] px-4 py-3 rounded-lg focus:outline-none focus:border-[var(--terracotta-400)] text-sm" />
                <input required type="text" placeholder="Last Name" className="w-full bg-white border border-[var(--border-subtle)] px-4 py-3 rounded-lg focus:outline-none focus:border-[var(--terracotta-400)] text-sm" />
                <input required type="text" placeholder="Address" className="w-full bg-white border border-[var(--border-subtle)] px-4 py-3 rounded-lg focus:outline-none focus:border-[var(--terracotta-400)] text-sm col-span-2" />
                <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full bg-white border border-[var(--border-subtle)] px-4 py-3 rounded-lg focus:outline-none focus:border-[var(--terracotta-400)] text-sm col-span-2" />
                <input required type="text" placeholder="City" className="w-full bg-white border border-[var(--border-subtle)] px-4 py-3 rounded-lg focus:outline-none focus:border-[var(--terracotta-400)] text-sm" />
                <input required type="text" placeholder="Postal Code" className="w-full bg-white border border-[var(--border-subtle)] px-4 py-3 rounded-lg focus:outline-none focus:border-[var(--terracotta-400)] text-sm" />
              </div>
            </section>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-12 bg-white rounded-2xl p-8 border border-[var(--border-subtle)] shadow-sm">
            <h2 className="font-serif text-2xl border-b border-[var(--ink-900)]/10 pb-4 mb-6">In Your Apothecary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-[var(--cream-100)] rounded overflow-hidden relative shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--forest-800)]/10" />
                    <span className="absolute -top-2 -right-2 bg-[var(--forest-900)] text-[var(--ink-50)] w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold z-10">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-sm font-medium leading-tight mb-1">{item.name}</h4>
                    <p className="text-[10px] opacity-60 uppercase">{item.potency}</p>
                  </div>
                  <div className="text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm border-t border-[var(--ink-900)]/10 pt-4 mb-4 opacity-80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cart.getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-lg font-medium border-t border-[var(--ink-900)]/10 pt-4 mb-8">
              <span>Total</span>
              <span>${cart.getTotal().toFixed(2)}</span>
            </div>

            <Button 
              type="submit"
              form="checkout-form"
              disabled={isProcessing}
              size="lg" 
              className="w-full bg-[var(--forest-900)] text-[var(--ink-50)] hover:bg-[var(--forest-950)] mb-4"
            >
              {isProcessing ? "Processing Securely..." : "Complete Order"}
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-xs opacity-60">
              <Lock className="h-3 w-3" /> All transactions are secure and encrypted.
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
