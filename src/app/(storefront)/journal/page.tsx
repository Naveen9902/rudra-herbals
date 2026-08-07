import Link from "next/link"
import { prisma } from "@/lib/db"
import { Card } from "@/components/ui/card"

export const dynamic = "force-dynamic"

export default async function JournalPage() {
  const posts = await prisma.journalPost.findMany({
    orderBy: { publishedAt: 'desc' }
  })

  return (
    <div className="bg-[var(--forest-900)] text-[var(--ink-50)] min-h-screen py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-16 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--terracotta-400)] mb-3">
            Readings & Reveries
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-[var(--gold-400)]">The Journal</h1>
        </header>

        {posts.length === 0 ? (
           <div className="text-center py-24 bg-[var(--forest-950)]/50 rounded-2xl border border-[var(--border-subtle)]">
             <h3 className="font-serif text-2xl mb-2 text-[var(--gold-400)]">No entries yet.</h3>
             <p className="opacity-80">Check back soon for insights on clinical herbalism.</p>
           </div>
        ) : (
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <Card key={post.id} className="group overflow-hidden bg-[var(--forest-800)] border-transparent transition-all hover:border-[var(--border-subtle)] flex flex-col">
                <Link href={`/journal/${post.slug}`} className="block relative aspect-[4/3] bg-[var(--forest-950)] overflow-hidden">
                   <div className="absolute inset-0 bg-[var(--sage-tint)]/20 group-hover:scale-105 transition-transform duration-700" />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <time className="text-xs font-bold tracking-widest uppercase opacity-60 mb-3 block">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})}
                  </time>
                  <h3 className="font-serif text-2xl text-[var(--gold-400)] mb-3">
                    <Link href={`/journal/${post.slug}`} className="hover:underline">{post.title}</Link>
                  </h3>
                  <p className="opacity-80 text-sm mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link href={`/journal/${post.slug}`} className="mt-auto inline-flex font-semibold tracking-wider uppercase text-xs text-[var(--terracotta-400)] hover:underline">
                    Read Article &rarr;
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
