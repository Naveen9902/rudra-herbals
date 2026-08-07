import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wind, Flame, Droplets } from "lucide-react"

export const revalidate = 3600

export default function RitualsPage() {
  return (
    <div className="bg-[var(--forest-900)] text-[var(--ink-50)] min-h-screen">
      <section className="py-24 px-6 mx-auto max-w-7xl text-center">
        <h1 className="font-serif text-5xl md:text-6xl text-[var(--gold-400)] mb-6">
          Understanding Ayurveda
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-80 leading-relaxed mb-12">
          Ayurveda is the ancient science of life. It teaches us that true wellness comes from living in harmony with the natural elements that make up the universe and our bodies. Discover your unique elemental blueprint, or Dosha, to find your bespoke path to balance.
        </p>
        <Button size="lg" className="bg-[var(--terracotta-400)] text-[var(--forest-950)] hover:bg-[var(--terracotta-500)] mb-24">
          Take the Dosha Quiz
        </Button>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {/* Vata */}
          <Card className="bg-[var(--forest-950)] border-transparent hover:border-[var(--border-subtle)] transition-colors flex flex-col">
            <CardContent className="pt-8 flex flex-col flex-1 h-full">
              <Wind className="h-10 w-10 text-[var(--terracotta-400)] mb-6" />
              <h3 className="font-serif text-3xl text-[var(--gold-400)] mb-3">Vata</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--sage-tint)] mb-4">Air & Space</p>
              <p className="opacity-80 text-sm leading-relaxed flex-1">
                The energy of movement. When in balance, Vata types are highly creative, energetic, and adaptable. When out of balance, they may experience anxiety, dryness, and irregular digestion. Grounding routines and warming adaptogens help restore Vata harmony.
              </p>
            </CardContent>
          </Card>

          {/* Pitta */}
          <Card className="bg-[var(--forest-950)] border-transparent hover:border-[var(--border-subtle)] transition-colors flex flex-col">
            <CardContent className="pt-8 flex flex-col flex-1 h-full">
              <Flame className="h-10 w-10 text-[var(--terracotta-400)] mb-6" />
              <h3 className="font-serif text-3xl text-[var(--gold-400)] mb-3">Pitta</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--sage-tint)] mb-4">Fire & Water</p>
              <p className="opacity-80 text-sm leading-relaxed flex-1">
                The energy of transformation. Balanced Pitta manifests as intelligence, strong digestion, and leadership. Excess Pitta can lead to inflammation, acidity, and irritability. Cooling herbs and calming rituals are essential for pacifying Pitta heat.
              </p>
            </CardContent>
          </Card>

          {/* Kapha */}
          <Card className="bg-[var(--forest-950)] border-transparent hover:border-[var(--border-subtle)] transition-colors flex flex-col">
            <CardContent className="pt-8 flex flex-col flex-1 h-full">
              <Droplets className="h-10 w-10 text-[var(--terracotta-400)] mb-6" />
              <h3 className="font-serif text-3xl text-[var(--gold-400)] mb-3">Kapha</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--sage-tint)] mb-4">Earth & Water</p>
              <p className="opacity-80 text-sm leading-relaxed flex-1">
                The energy of structure. Kapha provides stability, endurance, and deep compassion. When stagnant, it can cause lethargy, congestion, and stubborn weight gain. Stimulating botanicals and vigorous movement help awaken Kapha vitality.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
