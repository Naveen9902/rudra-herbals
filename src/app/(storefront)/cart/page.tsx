import Link from "next/link"
import { prisma } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { CartClient } from "./cart-client"

export default async function CartPage() {
  const mockCrossSell = await prisma.product.findMany({ take: 3 })

  return (
    <div className="bg-[var(--cream-50)] text-[var(--ink-900)] min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <header className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-[var(--forest-900)] mb-2">
            Your Apothecary
          </h1>
          <p className="opacity-70 text-sm">
            Not ready to checkout? <Link href="/shop" className="underline hover:text-[var(--terracotta-400)]">Continue Exploring</Link>
          </p>
        </header>

        <CartClient />

        {/* Cross-Sell */}
        <div className="mt-24 pt-16 border-t border-[var(--ink-900)]/10">
          <div className="text-center mb-10">
            <h3 className="font-serif text-3xl text-[var(--forest-900)]">Complement Your Ritual</h3>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {mockCrossSell.map((item) => (
              <div key={item.id} className="flex flex-col text-center items-center bg-[var(--cream-100)] p-6 rounded-2xl">
                <div className="w-full aspect-[4/3] bg-white/50 rounded-lg mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--sage-tint)]/10 to-transparent" />
                </div>
                <h4 className="font-serif text-xl font-medium mb-2">{item.name}</h4>
                <Button variant="link" className="text-[var(--terracotta-400)] font-semibold uppercase tracking-wider text-xs">
                  <Link href={`/product/${item.slug}`}>View &ndash; ${item.price.toFixed(2)}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
