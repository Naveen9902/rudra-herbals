"use client"

import { useState } from "react"
import { QuantityStepper } from "@/components/ui/quantity-stepper"
import { Button } from "@/components/ui/button"
import type { Product } from "@prisma/client"
import { useCartStore } from "@/lib/store/cart"

export function AddToCartActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  let variants = []
  try {
    if (product.variants) {
      variants = JSON.parse(product.variants)
    }
  } catch (e) {}

  const [selectedVariant, setSelectedVariant] = useState(variants.length > 0 ? variants[0] : null)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: selectedVariant ? selectedVariant.price : product.price,
      potency: product.potency,
      quantity,
      variantName: selectedVariant ? selectedVariant.name : undefined,
    })
    alert(`Added ${quantity} of ${product.name}${selectedVariant ? ` (${selectedVariant.name})` : ''} to your apothecary.`)
  }

  const currentPrice = selectedVariant ? selectedVariant.price : product.price

  return (
    <div className="space-y-8">
      {/* Price Display */}
      <div className="flex items-end gap-4">
        <span className="text-3xl font-medium">₹{currentPrice.toFixed(2)}</span>
        {product.compareAtPrice && (
          <span className="text-lg opacity-50 line-through pb-1">₹{product.compareAtPrice.toFixed(2)}</span>
        )}
      </div>

      {/* Variant Selector */}
      {variants.length > 0 && (
        <div className="space-y-3">
          <label className="block text-xs uppercase tracking-widest text-[var(--sage-tint)] font-semibold">Size</label>
          <div className="flex flex-wrap gap-3">
            {variants.map((variant: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedVariant(variant)}
                className={`px-4 py-2 text-sm border rounded-md transition-colors ${
                  selectedVariant?.name === variant.name 
                    ? "border-[var(--gold-400)] text-[var(--gold-400)] bg-[var(--gold-400)]/10" 
                    : "border-[var(--border-subtle)] text-[var(--ink-50)] hover:border-[var(--gold-400)]/50"
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 pt-2">
        <QuantityStepper 
          quantity={quantity} 
          onQuantityChange={setQuantity} 
          min={1} 
          max={10} 
        />
        <Button 
          size="lg" 
          onClick={handleAddToCart}
          className="flex-1 bg-[var(--gold-400)] text-[var(--forest-950)] hover:bg-[var(--gold-500)]"
        >
          + Add to Ritual
        </Button>
      </div>
    </div>
  )
}
