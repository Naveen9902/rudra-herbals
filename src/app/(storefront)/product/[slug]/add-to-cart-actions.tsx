"use client"

import { useState } from "react"
import { QuantityStepper } from "@/components/ui/quantity-stepper"
import { Button } from "@/components/ui/button"
import type { Product } from "@prisma/client"
import { useCartStore } from "@/lib/store/cart"

export function AddToCartActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      potency: product.potency,
      quantity,
    })
    alert(`Added ${quantity} of ${product.name} to your apothecary.`)
  }

  return (
    <div className="flex items-center gap-6">
      <QuantityStepper 
        quantity={quantity} 
        onQuantityChange={setQuantity} 
        min={1} 
        max={10} 
      />
      <Button 
        size="lg" 
        onClick={handleAddToCart}
        className="flex-1"
      >
        + Add to Ritual
      </Button>
    </div>
  )
}
