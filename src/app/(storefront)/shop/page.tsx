import Link from "next/link"
import { Suspense } from "react"
import { prisma } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ShopFilters } from "./shop-filters"

export const dynamic = "force-dynamic"

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const params = await searchParams
  const potencyParam = params.potency as string | undefined
  const ritualsParam = params.rituals as string | undefined

  const selectedPotencies = potencyParam ? potencyParam.split(",") : []
  const selectedRituals = ritualsParam ? ritualsParam.split(",") : []

  const whereClause: any = { isActive: true }

  if (selectedPotencies.length > 0) {
    whereClause.potency = { in: selectedPotencies }
  }

  if (selectedRituals.length > 0) {
    whereClause.tags = {
      some: {
        tag: {
          label: { in: selectedRituals }
        }
      }
    }
  }

  const products = await prisma.product.findMany({
    where: whereClause,
    include: {
      tags: { include: { tag: true } },
    },
  })

  // Get all unique tags for the filter sidebar
  const allTags = await prisma.tag.findMany()
  const allPotencies = ["Gentle", "Standard", "Reserve"]

  return (
    <div className="min-h-screen bg-[var(--forest-900)] text-[var(--ink-50)]">
      {/* Header */}
      <header className="bg-[var(--forest-950)] py-20 px-6 text-center border-b border-[var(--border-subtle)]">
        <h1 className="font-serif text-4xl md:text-6xl tracking-tight text-[var(--gold-400)] mb-4">
          The Apothecary Vault
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-80">
          Discover our full collection of clinical-grade botanicals, crafted for deep restoration and systemic balance.
        </p>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <Suspense fallback={<div className="animate-pulse bg-[var(--forest-800)] h-96 rounded-xl"></div>}>
            <ShopFilters 
              availableRituals={allTags.map(t => t.label)} 
              availablePotencies={allPotencies}
              selectedRituals={selectedRituals}
              selectedPotencies={selectedPotencies}
            />
          </Suspense>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-24 bg-[var(--forest-950)]/50 rounded-2xl border border-[var(--border-subtle)]">
              <h3 className="font-serif text-2xl mb-2 text-[var(--gold-400)]">No elixirs found.</h3>
              <p className="opacity-80">Adjust your filters to discover other formulations.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Card key={product.id} className="group relative overflow-hidden bg-[var(--forest-800)] border-transparent transition-all hover:border-[var(--border-subtle)] flex flex-col">
                  {product.potency === 'Reserve' && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge variant="reserve">Reserve</Badge>
                    </div>
                  )}
                  <Link href={`/product/${product.slug}`} className="block relative aspect-square bg-[var(--forest-950)] overflow-hidden">
                    {(() => {
                      try {
                        const images = JSON.parse(product.images || "[]")
                        if (images && images.length > 0) {
                          return (
                            <img 
                              src={images[0]} 
                              alt={product.name} 
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          )
                        }
                      } catch (e) {
                        // ignore parse errors
                      }
                      return <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--forest-900)] opacity-80" />
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-950)] via-transparent opacity-60" />
                  </Link>
                  
                  <div className="flex flex-col flex-1 p-6 z-10 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {product.tags.slice(0,2).map(t => (
                        <Badge key={t.tag.id} variant="tag">{t.tag.label}</Badge>
                      ))}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-[var(--gold-400)] mb-2">
                        <Link href={`/product/${product.slug}`} className="hover:underline">
                          {product.name}
                        </Link>
                      </h3>
                      <p className="text-sm opacity-80 line-clamp-2">
                        {product.shortDescription}
                      </p>
                    </div>
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-[var(--border-subtle)]">
                      <span className="font-medium">${product.price.toFixed(2)}</span>
                      <Button size="sm" className="h-9 px-4 text-xs font-semibold tracking-wider">
                        + Add to Ritual
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
