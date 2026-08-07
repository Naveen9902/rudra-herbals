"use client"

import { useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface ShopFiltersProps {
  availableRituals: string[]
  availablePotencies: string[]
  selectedRituals: string[]
  selectedPotencies: string[]
}

export function ShopFilters({
  availableRituals,
  availablePotencies,
  selectedRituals,
  selectedPotencies,
}: ShopFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string[]) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value.length > 0) {
        params.set(name, value.join(","))
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const toggleFilter = (type: "rituals" | "potency", item: string) => {
    const current = type === "rituals" ? selectedRituals : selectedPotencies
    const newValues = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item]
    
    router.push(`?${createQueryString(type, newValues)}`, { scroll: false })
  }

  return (
    <div className="space-y-10">
      {/* Rituals Filter */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--gold-400)] mb-4">
          Rituals
        </h3>
        <div className="space-y-3">
          {availableRituals.map((ritual) => {
            const isChecked = selectedRituals.includes(ritual)
            return (
              <div 
                key={ritual} 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => toggleFilter("rituals", ritual)}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-[var(--terracotta-400)] border-[var(--terracotta-400)]' : 'border-[var(--border-subtle)] group-hover:border-[var(--terracotta-400)]'}`}>
                  {isChecked && (
                    <svg className="w-3.5 h-3.5 text-[var(--forest-950)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                  {ritual}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Potency Filter */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--gold-400)] mb-4">
          Potency
        </h3>
        <div className="flex flex-wrap gap-2">
          {availablePotencies.map((potency) => {
            const isActive = selectedPotencies.includes(potency)
            return (
              <button
                key={potency}
                onClick={() => toggleFilter("potency", potency)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors border ${
                  isActive 
                    ? 'bg-[var(--sage-tint)] border-[var(--sage-tint)] text-[var(--ink-50)]' 
                    : 'bg-transparent border-[var(--border-subtle)] text-[var(--ink-50)] opacity-70 hover:opacity-100 hover:border-[var(--terracotta-400)]'
                }`}
              >
                {potency}
              </button>
            )
          })}
        </div>
      </div>

      {/* Reset Filters */}
      {(selectedRituals.length > 0 || selectedPotencies.length > 0) && (
        <div className="pt-6 border-t border-[var(--border-subtle)]">
          <button
            onClick={() => router.push('?', { scroll: false })}
            className="text-xs font-bold uppercase tracking-widest text-[var(--terracotta-400)] hover:text-[var(--gold-400)] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  )
}
