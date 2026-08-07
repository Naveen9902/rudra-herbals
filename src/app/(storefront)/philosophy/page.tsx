import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, FlaskConical } from "lucide-react"

export default function PhilosophyPage() {
  return (
    <div className="bg-[var(--forest-900)] text-[var(--ink-50)] min-h-screen">
      
      {/* Intro Split Section */}
      <section className="py-24 px-6 mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="flex gap-2">
              <Badge variant="tag">Holistic</Badge>
              <Badge variant="tag">Clinical</Badge>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl text-[var(--gold-400)] leading-tight">
              Rooted in<br/>Ancient Wisdom.
            </h1>
            <p className="text-lg opacity-80 max-w-md leading-relaxed">
              We believe true vitality exists at the intersection of nature’s intelligence and rigorous modern science. Our methodology honors both the spirit of the plant and the exactitude of the lab.
            </p>
          </div>
          <div className="aspect-[4/5] md:aspect-square bg-[var(--forest-950)] rounded-3xl overflow-hidden relative border border-[var(--border-subtle)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--terracotta-400)]/20 to-transparent opacity-50" />
          </div>
        </div>
      </section>

      {/* The Methodology */}
      <section className="bg-[var(--forest-950)] py-32 px-6 border-y border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl space-y-32">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--sage-tint)] mb-3">
              Our Methodology
            </p>
            <h2 className="font-serif text-4xl text-[var(--gold-400)]">The Alchemy of Healing</h2>
          </div>

          {/* 01: Sourcing */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 aspect-video md:aspect-[4/3] bg-[var(--forest-900)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden relative">
              <div className="absolute inset-0 bg-[var(--sage-tint)]/10" />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <span className="font-serif text-3xl text-[var(--terracotta-400)] opacity-80">01 /</span>
              <h3 className="font-serif text-3xl">Ethical Harvests</h3>
              <p className="opacity-80 leading-relaxed text-lg">
                We partner exclusively with multi-generational farming cooperatives and wild-crafters who harvest in harmony with the lunar cycle to ensure peak phytochemical density.
              </p>
              <Link href="/sourcing" className="inline-flex items-center gap-2 text-[var(--terracotta-400)] font-medium hover:underline tracking-wide uppercase text-sm">
                Learn about our sources <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 02: Extraction */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="font-serif text-3xl text-[var(--terracotta-400)] opacity-80">02 /</span>
              <h3 className="font-serif text-3xl">Cold-Pressed Purity</h3>
              <p className="opacity-80 leading-relaxed text-lg">
                Traditional decoctions destroy delicate terpenes. We utilize advanced cold-extraction methods to capture the full spectrum of volatile oils and active compounds without heat degradation.
              </p>
              <Link href="/sustainability" className="inline-flex items-center gap-2 text-[var(--terracotta-400)] font-medium hover:underline tracking-wide uppercase text-sm">
                Explore our process <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="aspect-video md:aspect-[4/3] bg-[var(--forest-900)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden relative">
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
        </div>
      </section>

      {/* The Lineage */}
      <section className="py-32 px-6 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--terracotta-400)] mb-3">
            The Lineage
          </p>
          <h2 className="font-serif text-4xl text-[var(--gold-400)]">Bridging Eras</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 aspect-[3/4] bg-[var(--forest-800)] rounded-2xl p-6 flex flex-col justify-end border border-[var(--border-subtle)]">
            <div className="mt-auto space-y-2">
              <h4 className="font-serif text-2xl text-[var(--gold-400)]">Our Formulators</h4>
              <p className="opacity-80 text-sm">A collective of Ayurvedic Vaidyas and clinical pharmacologists.</p>
            </div>
          </div>
          
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 h-full">
            <Card className="bg-[var(--forest-950)] flex flex-col justify-center border-transparent hover:border-[var(--border-subtle)] transition-colors h-full">
              <CardContent className="pt-6 space-y-6">
                <BookOpen className="h-10 w-10 text-[var(--gold-400)] opacity-70" />
                <h4 className="font-serif text-2xl">Ancient Texts</h4>
                <p className="opacity-80 text-sm leading-relaxed">
                  Our core formulas are adapted from the Charaka Samhita and Sushruta Samhita, utilizing synergistic pairing (Anupana) to amplify efficacy.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-[var(--forest-950)] flex flex-col justify-center border-transparent hover:border-[var(--border-subtle)] transition-colors h-full">
              <CardContent className="pt-6 space-y-6">
                <FlaskConical className="h-10 w-10 text-[var(--gold-400)] opacity-70" />
                <h4 className="font-serif text-2xl">Clinical Trials</h4>
                <p className="opacity-80 text-sm leading-relaxed">
                  Every formulation undergoes independent, double-blind trials to verify claims of cortisol reduction, cognitive enhancement, and systemic support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  )
}
