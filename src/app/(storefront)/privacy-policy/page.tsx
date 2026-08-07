import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[var(--cream-50)] text-[var(--ink-900)] min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <Link href="/" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-[var(--terracotta-400)] hover:text-[var(--gold-400)] transition-colors mb-16">
          <ChevronLeft className="h-4 w-4 mr-1" /> Return Home
        </Link>
        
        <header className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-[var(--forest-900)] mb-6">Privacy Policy</h1>
          <p className="text-lg opacity-80 uppercase tracking-widest text-[var(--terracotta-400)]">Data Protection & Transparency</p>
        </header>

        <div className="space-y-8 text-lg opacity-90 leading-relaxed font-serif">
          
          <p>
            At Rudra Herbals, we honor the sanctity of your personal data just as we honor the integrity of our botanical sourcing. This policy outlines how we collect, use, and protect your information.
          </p>

          <h3 className="font-serif text-2xl text-[var(--forest-900)] pt-6">1. Information We Collect</h3>
          <p>
            We collect information you provide directly to us when you create an account, complete a Dosha Quiz, make a purchase, or book a consultation. This may include your name, email address, shipping details, and holistic health metrics shared voluntarily.
          </p>

          <h3 className="font-serif text-2xl text-[var(--forest-900)] pt-6">2. How We Use Your Data</h3>
          <p>
            Your data is used strictly to fulfill your orders, tailor your holistic recommendations (such as personalized rituals), and communicate vital updates regarding your account or subscriptions. We do not sell your personal data to third-party advertisers.
          </p>

          <h3 className="font-serif text-2xl text-[var(--forest-900)] pt-6">3. Payment Security</h3>
          <p>
            All payment transactions are encrypted and processed through secure third-party gateways (e.g., Stripe, Razorpay). We do not store your credit card details or UPI credentials on our servers.
          </p>

          <h3 className="font-serif text-2xl text-[var(--forest-900)] pt-6">4. Your Rights</h3>
          <p>
            You have the right to request access to, modification of, or deletion of your personal data at any time. You may manage your preferences directly from your Account Sanctuary or by contacting us at <strong>privacy@rudraherbals.com</strong>.
          </p>

        </div>
      </div>
    </div>
  )
}
