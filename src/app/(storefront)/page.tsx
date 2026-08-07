import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Beaker, Leaf, CheckCircle } from "lucide-react"

import { prisma } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-[var(--forest-900)] text-[var(--ink-50)] text-center px-4">
        {/* Background gradient/texture stub */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-0 pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--terracotta-400)]">
            Ancient Roots, Modern Science
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-tight">
            Botanical Wisdom, <br />
            <em className="italic text-[var(--gold-400)]">Refined.</em>
          </h1>
          <p className="mx-auto max-w-xl text-lg opacity-80 md:text-xl">
            Clinical-grade Ayurvedic formulations designed for systemic resilience, deep rest, and sustained clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/shop">Explore Elixirs</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-[var(--ink-50)] border-[var(--ink-50)] hover:bg-[var(--ink-50)] hover:text-[var(--forest-950)]">
              <Link href="/philosophy">Our Philosophy</Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* The Collection — Heritage Elixirs */}
      <section className="bg-[var(--forest-950)] py-24 text-[var(--ink-50)] px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--terracotta-400)] mb-3">
              The Collection
            </p>
            <h2 className="font-serif text-4xl md:text-5xl">Heritage Elixirs</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => {
              const tags = product.tags.map((t) => t.tag.label)
              return (
                <Card key={product.id} className="group relative overflow-hidden bg-[var(--forest-800)] border-transparent transition-all hover:border-[var(--border-subtle)]">
                  {product.potency === 'Reserve' && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge variant="reserve">Reserve</Badge>
                    </div>
                  )}
                  <div className="aspect-[4/5] bg-[var(--forest-900)] p-6 flex flex-col justify-end relative">
                    {/* Placeholder image */}
                    <div className="absolute inset-0 bg-[var(--sage-tint)]/20" />
                    
                    <div className="relative z-10 space-y-3">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tags.slice(0,2).map(tag => (
                          <Badge key={tag} variant="tag">{tag}</Badge>
                        ))}
                      </div>
                      <h3 className="font-serif text-2xl text-[var(--gold-400)]">
                        {product.name}
                      </h3>
                      <p className="text-sm opacity-80 line-clamp-2">
                        {product.shortDescription}
                      </p>
                      <div className="flex items-center justify-between pt-4">
                        <span className="font-medium">${product.price.toFixed(2)}</span>
                        <Button asChild variant="link" className="text-[var(--terracotta-400)] p-0 h-auto font-medium tracking-wider uppercase text-xs">
                          <Link href={`/product/${product.slug}`}>View Details &rarr;</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Curated Subscriptions Promo */}
      <section className="bg-[var(--cream-50)] py-24 text-[var(--ink-900)] px-6">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[var(--cream-100)] p-8 md:p-16 text-center shadow-sm border border-[var(--border-subtle)]">
          <h2 className="font-serif text-3xl md:text-5xl mb-6 text-[var(--forest-900)]">
            Consistency is the highest form of alchemy.
          </h2>
          <p className="mx-auto max-w-2xl text-lg mb-8 opacity-80">
            Subscribe to your foundational rituals. Receive automatic replenishments, exclusive access to Reserve batches, and complimentary consultations.
          </p>
          <Button asChild size="lg" className="bg-[var(--forest-900)] text-[var(--ink-50)] hover:bg-[var(--forest-950)]">
            <Link href="/rituals">Join the Circle</Link>
          </Button>
        </div>
      </section>

      {/* Methodology Teaser */}
      <section className="bg-[var(--forest-900)] py-24 text-[var(--ink-50)] px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--sage-tint)] mb-3">
                Our Methodology
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-[var(--gold-400)] leading-tight">
                Clinical Purity.<br/>Ancient Roots.
              </h2>
            </div>
            <p className="text-lg opacity-80 leading-relaxed">
              We bridge the gap between traditional Ayurvedic wisdom and modern clinical validation. Every formulation is cold-extracted to preserve volatile compounds and rigorously third-party tested for purity and potency.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-[var(--terracotta-400)]" />
                <span className="font-medium tracking-wide">Wild-harvested botanicals</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-[var(--terracotta-400)]" />
                <span className="font-medium tracking-wide">Cold-extraction process</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-[var(--terracotta-400)]" />
                <span className="font-medium tracking-wide">Bioavailable formulations</span>
              </li>
            </ul>
            <Button asChild variant="outline" size="lg" className="text-[var(--ink-50)] border-[var(--ink-50)] hover:bg-[var(--ink-50)] hover:text-[var(--forest-900)]">
              <Link href="/philosophy">Discover the Method</Link>
            </Button>
          </div>
          
          <div className="relative">
            {/* Abstract visual */}
            <div className="aspect-square bg-[var(--forest-950)] rounded-full border border-[var(--border-subtle)] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--sage-tint)]/20 to-transparent" />
              <Leaf className="h-32 w-32 text-[var(--sage-tint)] opacity-50" />
            </div>
            
            {/* Floating badge card */}
            <Card className="absolute -bottom-8 -left-8 md:bottom-8 md:-left-16 bg-[var(--forest-800)]/90 backdrop-blur border-[var(--border-subtle)] p-6 shadow-2xl max-w-xs">
              <div className="flex items-start gap-4">
                <div className="bg-[var(--terracotta-400)]/20 p-3 rounded-full">
                  <Beaker className="h-6 w-6 text-[var(--terracotta-400)]" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-[var(--gold-400)]">Third-Party Tested</h4>
                  <p className="text-sm opacity-80 mt-1">Verified for heavy metals, microbes, and active compounds.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
