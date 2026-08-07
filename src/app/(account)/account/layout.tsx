import Link from "next/link"
import { LogOut, Package, RefreshCw, Settings, LayoutDashboard, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SanctuaryDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--noir-950)] border-r border-white/5 flex flex-col hidden md:flex shrink-0">
        <div className="p-8 pb-4">
          <Link href="/" className="font-serif text-2xl italic tracking-wider text-[var(--gold-400)] block mb-12">
            Rudra Herbals
          </Link>
          
          <div className="mb-10">
            <div className="w-12 h-12 bg-white/5 rounded-full mb-4 flex items-center justify-center font-serif text-lg text-[var(--gold-400)] border border-[var(--gold-400)]/30">
              U
            </div>
            <h2 className="font-serif text-xl text-white">Guest User</h2>
            <p className="text-xs uppercase tracking-widest text-[var(--gold-400)] mt-1">Vaidya Level I</p>
          </div>

          <nav className="space-y-1">
            <Link href="/account" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors text-[var(--gold-400)] bg-white/5">
              <LayoutDashboard className="h-4 w-4" /> Overview
            </Link>
            <Link href="/account/rituals" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors text-white/70 hover:text-white">
              <RefreshCw className="h-4 w-4" /> My Rituals
            </Link>
            <Link href="/account/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors text-white/70 hover:text-white">
              <Package className="h-4 w-4" /> Orders
            </Link>
            <Link href="/account/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors text-white/70 hover:text-white">
              <Settings className="h-4 w-4" /> Settings
            </Link>
          </nav>
        </div>

        <div className="mt-auto p-8 pt-4 space-y-4 border-t border-white/5">
          <Button asChild variant="outline" className="w-full border-white/10 text-white hover:bg-white/5">
            <Link href="/shop"><ShoppingBag className="h-4 w-4 mr-2" /> Apothecary Shop</Link>
          </Button>
          <button className="flex w-full items-center gap-3 px-4 py-2 text-sm font-medium text-white/50 hover:text-white transition-colors">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative">
        {/* Parchment overlay texture background */}
        <div className="absolute inset-0 bg-[var(--parchment-overlay)] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />
        
        <div className="relative z-10 p-6 md:p-12">
          {children}
        </div>
      </main>
    </div>
  )
}
