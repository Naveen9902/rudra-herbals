import { Card, CardContent } from '@/components/ui/card'
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { RefreshCw } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AccountRitualsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) redirect("/login")

  const subscriptions = await prisma.subscription.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: { product: true }
  })

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header>
        <h1 className="font-serif text-4xl text-[var(--gold-400)] mb-2">My Rituals</h1>
        <p className="text-white/70">Manage your botanical subscriptions and recurring deliveries.</p>
      </header>
      
      {subscriptions.length === 0 ? (
        <Card className="bg-[var(--glass-panel)] backdrop-blur-md border-white/10 shadow-2xl rounded-2xl overflow-hidden text-white">
          <CardContent className="p-12 text-center space-y-4">
            <RefreshCw className="w-12 h-12 text-[var(--gold-400)] mx-auto opacity-50 mb-6" />
            <p className="opacity-80 text-lg mb-4">You don't have any active rituals.</p>
            <Link href="/shop">
              <Button className="bg-[var(--gold-400)] text-black hover:bg-[var(--gold-500)]">
                Start a Ritual
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {subscriptions.map(sub => {
            let image = ""
            if (sub.product.images) {
              try {
                image = JSON.parse(sub.product.images)[0]
              } catch(e) {}
            }

            return (
              <Card key={sub.id} className="bg-[var(--glass-panel)] backdrop-blur-md border-white/10 shadow-2xl rounded-2xl overflow-hidden text-white">
                <div className="border-b border-white/10 bg-white/5 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[var(--gold-400)] mb-1">Ritual ID #{sub.id.slice(-8).toUpperCase()}</p>
                    <p className="text-sm opacity-80">Started {new Date(sub.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-left md:text-right">
                      <p className="text-xs opacity-80 uppercase tracking-wider">Next Delivery</p>
                      <p className="font-medium text-white">{new Date(sub.nextOrderDate).toLocaleDateString()}</p>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase ${sub.status === 'active' ? 'bg-green-900/50 text-green-400' : 'bg-white/10 text-white/70'}`}>
                      {sub.status}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg bg-white/5 border border-white/10 overflow-hidden shrink-0">
                      {image ? (
                        <img src={image} alt={sub.product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-white/10" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-xl text-[var(--gold-400)] truncate">{sub.product.name}</h3>
                      <p className="text-sm opacity-70 mt-1">Delivered {sub.frequency.toLowerCase()}</p>
                    </div>
                    <div className="shrink-0">
                      <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
