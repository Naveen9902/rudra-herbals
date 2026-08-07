import { Leaf } from "lucide-react"

export default function GlobalLoading() {
  return (
    <div className="bg-[var(--forest-900)] text-[var(--ink-50)] min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute inset-0 border-2 border-[var(--gold-400)]/20 border-t-[var(--gold-400)] rounded-full w-16 h-16 animate-spin" />
        <Leaf className="h-6 w-6 text-[var(--terracotta-400)] opacity-80" />
      </div>
      <p className="font-serif text-xl text-[var(--gold-400)] tracking-widest uppercase text-sm">
        Formulating...
      </p>
    </div>
  )
}
