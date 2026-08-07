import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="bg-[var(--forest-900)] text-[var(--ink-50)] min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="font-serif text-8xl text-[var(--gold-400)] mb-6 opacity-80">404</h1>
      <h2 className="font-serif text-3xl md:text-4xl mb-4">Path Not Found</h2>
      <p className="opacity-80 max-w-md mx-auto mb-10">
        Like an elusive wild botanical, the page you are looking for cannot be found in our current archives.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
        <Button asChild variant="outline" className="text-[var(--ink-50)] border-[var(--border-subtle)] hover:bg-[var(--sage-tint)]">
          <Link href="/shop">Explore Shop</Link>
        </Button>
      </div>
    </div>
  )
}
