import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[var(--forest-950)] text-[var(--ink-50)] border-t border-[var(--border-subtle)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="md:col-span-1">
            <h2 className="font-serif text-2xl italic tracking-wider text-[var(--gold-400)] mb-4">
              Rudra Herbals
            </h2>
            <p className="text-sm opacity-70 leading-relaxed">
              Botanical Wisdom, Refined. Clinical-grade Ayurvedic formulations designed for systemic resilience.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs mb-4 text-[var(--terracotta-400)]">Shop</h3>
              <li><Link href="/shop" className="hover:text-[var(--gold-400)] transition-colors">All Elixirs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs mb-4 text-[var(--terracotta-400)]">About</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li><Link href="/philosophy" className="hover:text-[var(--gold-400)] transition-colors">Our Philosophy</Link></li>
              <li><Link href="/sourcing" className="hover:text-[var(--gold-400)] transition-colors">Sourcing</Link></li>
              <li><Link href="/journal" className="hover:text-[var(--gold-400)] transition-colors">The Journal</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs mb-4 text-[var(--terracotta-400)]">Support</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li><Link href="/consultations" className="hover:text-[var(--gold-400)] transition-colors">Consultations</Link></li>
              <li><Link href="/shipping-returns" className="hover:text-[var(--gold-400)] transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[var(--gold-400)] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="mt-16 pt-8 border-t border-[var(--border-subtle)] text-xs opacity-50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Rudra Herbals. All rights reserved.</p>
          <p>These statements have not been evaluated by the FDA.</p>
        </div>
      </div>
    </footer>
  )
}
