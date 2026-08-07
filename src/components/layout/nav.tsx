import Link from "next/link"
import { ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--border-subtle)] bg-[var(--forest-950)]/80 backdrop-blur supports-[backdrop-filter]:bg-[var(--forest-950)]/60 text-[var(--ink-50)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-serif text-2xl italic tracking-wider text-[var(--gold-400)]">
            Rudra Herbals
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium tracking-wide">
            <Link href="/shop" className="hover:text-[var(--terracotta-400)] transition-colors">Shop</Link>
            <Link href="/philosophy" className="hover:text-[var(--terracotta-400)] transition-colors">Philosophy</Link>
            <Link href="/rituals" className="hover:text-[var(--terracotta-400)] transition-colors">Rituals</Link>
            <Link href="/journal" className="hover:text-[var(--terracotta-400)] transition-colors">Journal</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/account" className="hidden md:flex hover:text-[var(--gold-400)] transition-colors">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="hover:text-[var(--gold-400)] transition-colors">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
