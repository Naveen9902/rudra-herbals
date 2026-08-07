import { DoshaQuiz } from "@/components/quiz/dosha-quiz"

export const metadata = {
  title: "Discover Your Dosha | Rudra Herbals",
  description: "Take the Ayurvedic Dosha Quiz to discover your unique mind-body constitution and find botanical rituals tailored for you.",
}

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-[var(--forest-900)] text-[var(--ink-50)]">
      <section className="py-24 px-6 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--terracotta-400)] mb-4">
            Ayurvedic Assessment
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--gold-400)] mb-6">
            Discover Your Dosha
          </h1>
          <p className="max-w-2xl mx-auto text-lg opacity-80 leading-relaxed">
            Answer 5 quick questions about your natural tendencies. We will calculate your dominant elemental constitution and recommend rituals to bring you back to systemic balance.
          </p>
        </div>

        <DoshaQuiz />
      </section>
    </div>
  )
}
