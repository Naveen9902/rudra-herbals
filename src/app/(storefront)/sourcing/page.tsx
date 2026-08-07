import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function SourcingPage() {
  return (
    <div className="bg-[var(--cream-50)] text-[var(--ink-900)] min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <Link href="/" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-[var(--terracotta-400)] hover:text-[var(--gold-400)] transition-colors mb-16">
          <ChevronLeft className="h-4 w-4 mr-1" /> Return Home
        </Link>
        
        <header className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-[var(--forest-900)] mb-6">Our Sourcing</h1>
          <p className="text-lg opacity-80 uppercase tracking-widest text-[var(--terracotta-400)]">From Soil to Elixir</p>
        </header>

        <div className="space-y-12 text-lg opacity-90 leading-relaxed font-serif">
          
          <p>
            An elixir is only as potent as the soil it grows in. At Rudra Herbals, we bypass commercial brokers entirely. Instead, we have cultivated direct, fair-trade relationships with multi-generational farming families and wild-crafters across the Indian subcontinent.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-12">
            <div className="bg-white p-8 rounded-2xl border border-[var(--border-subtle)] space-y-4">
              <h3 className="font-serif text-2xl text-[var(--gold-400)]">Ashwagandha</h3>
              <p className="text-base opacity-80">
                Sourced from the arid, mineral-rich soils of Rajasthan. We exclusively harvest the roots post-monsoon when Withanolide concentration peaks.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[var(--border-subtle)] space-y-4">
              <h3 className="font-serif text-2xl text-[var(--gold-400)]">Brahmi</h3>
              <p className="text-base opacity-80">
                Wild-crafted from the pristine wetlands of Kerala. Harvested in the early morning to protect the delicate Bacosides from UV degradation.
              </p>
            </div>
          </div>

          <p>
            We strictly enforce regenerative agricultural practices. For every wild-crafted botanical we harvest, we fund the replanting of three more, ensuring these ancient ecosystems thrive for generations to come.
          </p>
          <p>
            Every single batch is third-party lab tested for heavy metals, pesticides, and microbial contaminants before it ever touches our extraction facility. Purity is not a promise; it is our baseline.
          </p>
        </div>
      </div>
    </div>
  )
}
