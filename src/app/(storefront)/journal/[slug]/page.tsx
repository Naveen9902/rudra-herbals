import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { prisma } from "@/lib/db"

export const revalidate = 3600

export default async function JournalPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = await params
  const post = await prisma.journalPost.findUnique({
    where: { slug }
  })

  if (!post) {
    notFound()
  }

  return (
    <div className="bg-[var(--forest-900)] text-[var(--ink-50)] min-h-screen pb-32">
      {/* Header */}
      <div className="bg-[var(--forest-950)] py-20 px-6 border-b border-[var(--border-subtle)] text-center">
        <div className="mx-auto max-w-3xl">
          <Link href="/journal" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[var(--sage-tint)] hover:text-[var(--terracotta-400)] mb-8 transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Journal
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--gold-400)] mb-6 leading-tight">
            {post.title}
          </h1>
          <time className="text-sm font-medium opacity-60">
            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})}
          </time>
        </div>
      </div>

      {/* Hero Image */}
      <div className="mx-auto max-w-5xl px-6 -mt-12 relative z-10 mb-16">
         <div className="aspect-video bg-[var(--forest-800)] rounded-2xl shadow-2xl overflow-hidden border border-[var(--border-subtle)] relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--terracotta-400)]/10 to-transparent" />
         </div>
      </div>

      {/* Body */}
      <article className="mx-auto max-w-2xl px-6 prose prose-invert prose-emerald prose-headings:font-serif prose-headings:text-[var(--gold-400)] prose-a:text-[var(--terracotta-400)] hover:prose-a:text-[var(--terracotta-500)] prose-p:leading-relaxed prose-p:opacity-90">
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </article>
    </div>
  )
}
