"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuantityStepperProps {
  quantity: number
  onQuantityChange: (newQuantity: number) => void
  min?: number
  max?: number
  className?: string
}

export function QuantityStepper({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  className,
}: QuantityStepperProps) {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1)
    }
  }

  return (
    <div className={cn("flex items-center space-x-3 border border-[var(--border-subtle)] rounded-full px-3 py-1.5 w-max bg-white/5", className)}>
      <button
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="text-[var(--foreground)] opacity-70 hover:opacity-100 disabled:opacity-30 transition-opacity focus:outline-none flex items-center justify-center p-1"
        aria-label="Decrease quantity"
      >
        <Minus className="w-3 h-3" />
      </button>
      <span className="text-sm font-semibold w-6 text-center tabular-nums text-[var(--foreground)]">
        {quantity}
      </span>
      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="text-[var(--foreground)] opacity-70 hover:opacity-100 disabled:opacity-30 transition-opacity focus:outline-none flex items-center justify-center p-1"
        aria-label="Increase quantity"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  )
}
