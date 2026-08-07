import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function ConsultationsPage() {
  return (
    <div className="bg-[var(--cream-50)] text-[var(--ink-900)] min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <Link href="/" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-[var(--terracotta-400)] hover:text-[var(--gold-400)] transition-colors mb-16">
          <ChevronLeft className="h-4 w-4 mr-1" /> Return Home
        </Link>
        
        <header className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-[var(--forest-900)] mb-6">Ayurvedic Consultations</h1>
          <p className="text-lg opacity-80 uppercase tracking-widest text-[var(--terracotta-400)]">Personalized Systemic Care</p>
        </header>

        <div className="space-y-12 text-lg opacity-90 leading-relaxed font-serif">
          <p>
            While our elixirs are formulated for broad systemic resilience, we understand that true healing often requires a tailored approach. Our resident Vaidyas (Ayurvedic physicians) offer one-on-one virtual consultations to map your unique constitution (Prakriti) and current state of imbalance (Vikriti).
          </p>
          
          <div className="bg-white border border-[var(--border-subtle)] p-8 rounded-2xl space-y-6">
            <h3 className="font-serif text-2xl text-[var(--forest-900)]">What to Expect</h3>
            <ul className="space-y-4 list-disc list-inside">
              <li>A comprehensive 60-minute intake covering your medical history, diet, and lifestyle.</li>
              <li>Tongue and pulse diagnostics (adapted for virtual assessment).</li>
              <li>A custom protocol including specific herbal recommendations, dietary adjustments, and daily rituals.</li>
              <li>A follow-up session after 4 weeks to track your progress and refine the protocol.</li>
            </ul>
          </div>
          
          <p>
            Consultations are currently limited to ensure the highest quality of care. If you are interested in booking a session, please email us at <strong>consultations@rudraherbals.com</strong> to join the waitlist.
          </p>
        </div>
      </div>
    </div>
  )
}
