import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function ShippingReturnsPage() {
  return (
    <div className="bg-[var(--cream-50)] text-[var(--ink-900)] min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <Link href="/" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-[var(--terracotta-400)] hover:text-[var(--gold-400)] transition-colors mb-16">
          <ChevronLeft className="h-4 w-4 mr-1" /> Return Home
        </Link>
        
        <header className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-[var(--forest-900)] mb-6">Shipping & Returns</h1>
          <p className="text-lg opacity-80 uppercase tracking-widest text-[var(--terracotta-400)]">Policies for Peace of Mind</p>
        </header>

        <div className="space-y-12 text-lg opacity-90 leading-relaxed font-serif">
          
          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-[var(--forest-900)]">Shipping Protocol</h2>
            <p>
              We process all orders within 1-2 business days. Because our elixirs are crafted in micro-batches to ensure peak potency, you will be notified immediately if an item is back-ordered.
            </p>
            <p>
              <strong>Domestic (India):</strong> Standard shipping (3-5 business days) is complimentary on all orders over ₹1500. For orders under ₹1500, a flat rate of ₹150 applies. Expedited shipping is available at checkout.
            </p>
            <p>
              <strong>International:</strong> We currently ship to the US, UK, and select EU countries. International rates are calculated dynamically at checkout based on weight and destination. Please note that customs duties are the responsibility of the recipient.
            </p>
          </section>

          <hr className="border-[var(--border-subtle)]" />

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-[var(--forest-900)]">Returns & Exchanges</h2>
            <p>
              Due to the consumable nature of our botanical formulations, we cannot accept returns on opened products. If you receive a damaged item or an incorrect order, please contact us within 7 days of delivery at <strong>support@rudraherbals.com</strong>.
            </p>
            <p>
              We stand by the efficacy of our elixirs. However, adaptogens require sustained use (typically 4-6 weeks) to alter systemic baselines. If you are unsatisfied after a full cycle of use, please reach out to our consultation team for guidance or a potential exchange for a formulation better suited to your constitution.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
