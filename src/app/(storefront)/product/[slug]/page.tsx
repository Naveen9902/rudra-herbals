import Link from "next/link"
import { notFound } from "next/navigation"
import { ShieldCheck, Leaf, FlaskConical, ChevronRight } from "lucide-react"

import { prisma } from "@/lib/db"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AddToCartActions } from "./add-to-cart-actions"

export const dynamic = "force-dynamic"

export default async function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      tags: { include: { tag: true } }
    }
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-[var(--forest-900)] text-[var(--ink-50)] min-h-screen">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 py-6 flex items-center text-xs font-semibold uppercase tracking-widest opacity-60">
        <Link href="/shop" className="hover:text-[var(--terracotta-400)]">Shop</Link>
        <ChevronRight className="h-3 w-3 mx-2" />
        <span>{product.name}</span>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Image */}
          <div className="relative aspect-[4/5] bg-[var(--forest-950)] rounded-2xl overflow-hidden border border-[var(--border-subtle)]">
            {(() => {
              try {
                const images = JSON.parse(product.images || "[]")
                if (images && images.length > 0) {
                  return (
                    <img 
                      src={images[0]} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )
                }
              } catch (e) {}
              return null
            })()}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--sage-tint)]/20 to-transparent pointer-events-none" />
            {product.potency === 'Reserve' && (
              <div className="absolute top-6 left-6 z-10">
                <Badge variant="reserve">Reserve Batch</Badge>
              </div>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map(t => (
                <Badge key={t.tag.id} variant="tag">{t.tag.label}</Badge>
              ))}
              <Badge variant="tag">Potency: {product.potency}</Badge>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--gold-400)] mb-4">
              {product.name}
            </h1>
            
            
            
            <div className="border-l-2 border-[var(--terracotta-400)] pl-6 mb-10">
              <p className="text-lg opacity-90 leading-relaxed">
                {product.longDescription}
              </p>
            </div>
            
            <div className="space-y-6">
              <AddToCartActions product={product} />
              <p className="text-sm opacity-60 text-center sm:text-left">
                Complimentary expedited shipping on orders over $150.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Efficacy Section */}
      <section className="bg-[var(--forest-950)] py-24 mt-12 border-t border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-[var(--gold-400)]">Clinical Efficacy</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {(() => {
              let efficacyItems = [
                { title: "Cold-Extracted", description: "Processed below 118°F to preserve delicate volatile oils and therapeutic compounds." },
                { title: "Bioavailable", description: "Formulated with natural lipid carriers to ensure maximum cellular absorption." },
                { title: "Purity Tested", description: "Rigorously screened for heavy metals, pesticides, and microbial contaminants." }
              ]
              if (product.efficacy) {
                try {
                  const parsed = JSON.parse(product.efficacy)
                  if (Array.isArray(parsed) && parsed.length > 0) efficacyItems = parsed
                } catch(e) {}
              }

              const icons = [FlaskConical, Leaf, ShieldCheck]

              return efficacyItems.map((item, idx) => {
                const Icon = icons[idx % icons.length]
                return (
                  <div key={idx} className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-[var(--forest-800)] flex items-center justify-center border border-[var(--border-subtle)]">
                      <Icon className="h-6 w-6 text-[var(--terracotta-400)]" />
                    </div>
                    <h3 className="font-serif text-xl">{item.title}</h3>
                    <p className="opacity-70 text-sm leading-relaxed max-w-xs mx-auto">
                      {item.description}
                    </p>
                  </div>
                )
              })
            })()}
          </div>
        </div>
      </section>

      {/* The Ritual Steps */}
      <section className="bg-[var(--forest-900)] py-24">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] bg-[var(--forest-800)] rounded-2xl overflow-hidden border border-[var(--border-subtle)]">
            <div className="absolute inset-0 bg-gradient-to-bl from-[var(--terracotta-400)]/10 to-transparent" />
          </div>
          <div className="space-y-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--sage-tint)] mb-3">
                Suggested Use
              </p>
              <h2 className="font-serif text-4xl text-[var(--gold-400)]">The Daily Ritual</h2>
            </div>
            <div className="space-y-8">
              {(() => {
                let ritualItems = [
                  { title: "Dose", description: "Take one full dropper (1ml) or steep one teaspoon in warm water." },
                  { title: "Timing", description: "Best consumed on an empty stomach, either first thing in the morning or 30 minutes before rest." },
                  { title: "Sustain", description: "Adaptogens build cumulatively. Consistent daily use for 4-6 weeks yields optimal resilience." }
                ]
                if (product.ritual) {
                  try {
                    const parsed = JSON.parse(product.ritual)
                    if (Array.isArray(parsed) && parsed.length > 0) ritualItems = parsed
                  } catch(e) {}
                }

                return ritualItems.map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="shrink-0 w-10 h-10 rounded-full border border-[var(--terracotta-400)] text-[var(--terracotta-400)] flex items-center justify-center font-serif text-xl">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold tracking-wide uppercase text-sm mb-1">{item.title}</h4>
                      <p className="opacity-80 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))
              })()}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
