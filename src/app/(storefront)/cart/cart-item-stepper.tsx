"use client"

import { useState } from "react"
import { QuantityStepper } from "@/components/ui/quantity-stepper"

export function CartItemStepper({ initialValue = 1 }: { initialValue?: number }) {
  const [quantity, setQuantity] = useState(initialValue)

  return (
    <QuantityStepper 
      quantity={quantity} 
      onQuantityChange={setQuantity} 
      min={1} 
      max={10} 
    />
  )
}
