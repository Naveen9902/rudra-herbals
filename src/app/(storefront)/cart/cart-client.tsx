"use client"

import Link from "next/link"
import { Lock, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCartStore } from "@/lib/store/cart"
import { QuantityStepper } from "@/components/ui/quantity-stepper"

export function CartClient() {
  const router = useRouter()
  // Hydration fix for Zustand persist
  const [mounted, setMounted] = useState(false)
  const cart = useCartStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-[50vh] flex items-center justify-center">Loading apothecary...</div>
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <div className="grid lg:grid-cols-12 gap-12">
      {/* Cart Items */}
      <div className="lg:col-span-7 xl:col-span-8 space-y-8">
        <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-bold uppercase tracking-widest opacity-50 pb-4 border-b border-[var(--ink-900)]/10">
          <div className="col-span-7">Product</div>
          <div className="col-span-3 text-center">Quantity</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        {cart.items.length === 0 ? (
          <div className="py-12 text-center text-[var(--forest-900)]">
            <h3 className="font-serif text-2xl mb-4">Your Apothecary is empty</h3>
            <Button asChild>
              <Link href="/shop">Explore the Collection</Link>
            </Button>
          </div>
        ) : (
          cart.items.map((item) => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center py-6 border-b border-[var(--ink-900)]/10">
              <div className="col-span-7 flex gap-6">
                <div className="w-24 h-32 shrink-0 bg-[var(--cream-100)] rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--forest-800)]/10" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-serif text-lg font-medium text-[var(--forest-900)] mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs opacity-60 mb-2">Potency: {item.potency}</p>
                  <button 
                    onClick={() => cart.removeItem(item.id)}
                    className="text-xs flex items-center gap-1 text-[var(--terracotta-400)] hover:underline opacity-80 mt-auto"
                  >
                    <X className="h-3 w-3" /> Remove
                  </button>
                </div>
              </div>
              <div className="col-span-3 flex justify-start sm:justify-center">
                <QuantityStepper 
                  quantity={item.quantity} 
                  onQuantityChange={(q: number) => cart.updateQuantity(item.id, q)} 
                  min={1} 
                  max={10} 
                />
              </div>
              <div className="col-span-2 font-medium sm:text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-5 xl:col-span-4">
        <Card className="bg-[var(--forest-900)] text-[var(--ink-50)] border-none sticky top-24">
          <div className="p-8 space-y-6">
            <h3 className="font-serif text-2xl text-[var(--gold-400)] border-b border-white/10 pb-4">
              Order Summary
            </h3>
            
            <div className="space-y-4 text-sm opacity-90">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cart.getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="opacity-60">Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span className="opacity-60">Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-4 font-medium text-lg">
              <span>Total</span>
              <span>${cart.getTotal().toFixed(2)}</span>
            </div>

            <Button 
              size="lg" 
              onClick={handleCheckout}
              disabled={cart.items.length === 0}
              className="w-full bg-[var(--gold-400)] text-[var(--forest-950)] hover:bg-[var(--gold-400)]/90 mt-4 disabled:opacity-50"
            >
              Proceed to Checkout
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs opacity-60 pt-2">
              <Lock className="h-3 w-3" /> Secure SSL Checkout
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
