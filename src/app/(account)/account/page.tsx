import Link from "next/link"
import { Package, Truck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AccountOverviewPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header>
        <h1 className="font-serif text-4xl text-[var(--gold-400)] mb-2">Welcome to your Sanctuary</h1>
        <p className="text-white/70">Manage your rituals, track orders, and update your preferences.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Alchemy (In-transit order) */}
        <Card className="bg-[var(--glass-panel)] backdrop-blur-md border-white/10 shadow-2xl rounded-2xl overflow-hidden text-white">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl text-[var(--gold-400)]">Recent Alchemy</h3>
              <div className="bg-white/10 p-2 rounded-full">
                <Truck className="h-5 w-5 text-[var(--gold-400)]" />
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm opacity-70 uppercase tracking-widest font-semibold">Order #RH-89234</p>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[var(--gold-400)] animate-pulse" />
                <span className="font-medium">In Transit</span>
              </div>
              <p className="text-sm opacity-70">Expected delivery: Tomorrow</p>
            </div>

            <Button className="w-full bg-[var(--gold-400)] text-[var(--noir-950)] hover:bg-[var(--gold-400)]/90 font-semibold tracking-wider">
              Track Order
            </Button>
          </CardContent>
        </Card>

        {/* Recent Orders List */}
        <Card className="bg-[var(--glass-panel)] backdrop-blur-md border-white/10 shadow-2xl rounded-2xl overflow-hidden text-white">
          <CardContent className="p-8">
             <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <h3 className="font-serif text-2xl text-[var(--gold-400)]">Order History</h3>
              <Link href="/account/orders" className="text-sm text-[var(--gold-400)] hover:underline flex items-center gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm py-2">
                <div>
                  <p className="font-semibold">RH-89233</p>
                  <p className="opacity-60">August 12, 2026</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$124.00</p>
                  <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white mt-1">
                    Delivered
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm py-2 border-t border-white/5">
                <div>
                  <p className="font-semibold">RH-88912</p>
                  <p className="opacity-60">July 04, 2026</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$85.00</p>
                  <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white mt-1">
                    Delivered
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Collections Promo */}
      <section className="pt-8 border-t border-white/10">
        <h3 className="font-serif text-2xl text-[var(--gold-400)] mb-6">Curated For You</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <Card key={i} className="bg-[var(--glass-panel)] border-white/5 overflow-hidden group hover:border-[var(--gold-400)]/30 transition-colors cursor-pointer text-white">
              <div className="aspect-[4/3] bg-black/40 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h4 className="font-serif text-lg text-[var(--gold-400)]">Reserve Batch</h4>
                  <p className="text-xs opacity-70">Limited availability</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
