import { Card, CardContent } from '@/components/ui/card'

export default function AccountPagePlaceholder() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header>
        <h1 className="font-serif text-4xl text-[var(--gold-400)] mb-2">Section under development</h1>
        <p className="text-white/70">This part of the Sanctuary is being refined.</p>
      </header>
      <Card className="bg-[var(--glass-panel)] backdrop-blur-md border-white/10 shadow-2xl rounded-2xl overflow-hidden text-white">
        <CardContent className="p-12 text-center space-y-4">
          <p className="opacity-80">Please check back later to manage your rituals, orders, or settings.</p>
        </CardContent>
      </Card>
    </div>
  )
}
