import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Moon, Sun, BrainCircuit } from "lucide-react"

export default function RitualsPage() {
  return (
    <div className="bg-[var(--forest-900)] text-[var(--ink-50)] min-h-screen">
      <section className="py-24 px-6 mx-auto max-w-7xl text-center">
        <h1 className="font-serif text-5xl md:text-6xl text-[var(--gold-400)] mb-6">
          Curated Rituals
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-80 leading-relaxed mb-12">
          Ayurvedic healing is deeply personal. Explore our signature routines designed to anchor your day, or take our dosha quiz to find your bespoke formulation.
        </p>
        <Button size="lg" className="bg-[var(--terracotta-400)] text-[var(--forest-950)] hover:bg-[var(--terracotta-500)] mb-24">
          Take the Dosha Quiz
        </Button>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {/* Morning Clarity */}
          <Card className="bg-[var(--forest-950)] border-transparent hover:border-[var(--border-subtle)] transition-colors flex flex-col">
            <CardContent className="pt-8 flex flex-col flex-1 h-full">
              <Sun className="h-10 w-10 text-[var(--terracotta-400)] mb-6" />
              <h3 className="font-serif text-3xl text-[var(--gold-400)] mb-3">Morning Clarity</h3>
              <p className="opacity-80 text-sm leading-relaxed mb-8 flex-1">
                Awaken your cognitive potential without caffeine jitters. Formulated to optimize cortisol levels and sustain focus throughout deep work sessions.
              </p>
              <Button asChild variant="outline" className="w-full border-[var(--border-subtle)] text-[var(--ink-50)] hover:bg-[var(--sage-tint)]">
                <Link href="/shop?rituals=Focus">Shop Morning Ritual</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Deep Focus */}
          <Card className="bg-[var(--forest-950)] border-transparent hover:border-[var(--border-subtle)] transition-colors flex flex-col">
            <CardContent className="pt-8 flex flex-col flex-1 h-full">
              <BrainCircuit className="h-10 w-10 text-[var(--terracotta-400)] mb-6" />
              <h3 className="font-serif text-3xl text-[var(--gold-400)] mb-3">Systemic Resilience</h3>
              <p className="opacity-80 text-sm leading-relaxed mb-8 flex-1">
                Foundational adaptogens to modulate the immune system, balance inflammation, and increase your baseline threshold for stress.
              </p>
              <Button asChild variant="outline" className="w-full border-[var(--border-subtle)] text-[var(--ink-50)] hover:bg-[var(--sage-tint)]">
                <Link href="/shop?rituals=Adaptogenic,Immunity">Shop Systemic Ritual</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Evening Rest */}
          <Card className="bg-[var(--forest-950)] border-transparent hover:border-[var(--border-subtle)] transition-colors flex flex-col">
            <CardContent className="pt-8 flex flex-col flex-1 h-full">
              <Moon className="h-10 w-10 text-[var(--terracotta-400)] mb-6" />
              <h3 className="font-serif text-3xl text-[var(--gold-400)] mb-3">Evening Rest</h3>
              <p className="opacity-80 text-sm leading-relaxed mb-8 flex-1">
                Signal the end of your day. Gentle nervines that down-regulate the nervous system, preparing the body for uninterrupted, restorative sleep.
              </p>
              <Button asChild variant="outline" className="w-full border-[var(--border-subtle)] text-[var(--ink-50)] hover:bg-[var(--sage-tint)]">
                <Link href="/shop?rituals=Calming">Shop Evening Ritual</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
