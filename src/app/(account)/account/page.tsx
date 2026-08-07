import Link from "next/link"
import { Package, Truck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AccountOverviewPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    redirect("/login")
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 3
  })

  const inTransitOrder = orders.find(o => o.status === 'shipped' || o.status === 'pending')
  const historyOrders = orders.filter(o => o.id !== inTransitOrder?.id).slice(0, 2)

  const curatedProducts = await prisma.product.findMany({
    where: { isActive: true },
    take: 3
  })

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header>
        <h1 className="font-serif text-4xl text-[var(--gold-400)] mb-2">Welcome to your Sanctuary</h1>
        <p className="text-white/70">Manage your rituals, track orders, and update your preferences.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Alchemy (In-transit order) */}
        <Card className="bg-[var(--glass-panel)] backdrop-blur-md border-white/10 shadow-2xl rounded-2xl overflow-hidden text-white">
          <CardContent className="p-8 space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl text-[var(--gold-400)]">Recent Alchemy</h3>
              <div className="bg-white/10 p-2 rounded-full">
                <Truck className="h-5 w-5 text-[var(--gold-400)]" />
              </div>
            </div>
            
            {inTransitOrder ? (
              <div className="space-y-4 flex-1">
                <div className="space-y-2">
                  <p className="text-sm opacity-70 uppercase tracking-widest font-semibold">Order #{inTransitOrder.id.slice(-6).toUpperCase()}</p>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[var(--gold-400)] animate-pulse" />
                    <span className="font-medium capitalize">{inTransitOrder.status}</span>
                  </div>
                  <p className="text-sm opacity-70">Ordered on: {new Date(inTransitOrder.createdAt).toLocaleDateString()}</p>
                </div>
                <Button className="w-full bg-[var(--gold-400)] text-[var(--noir-950)] hover:bg-[var(--gold-400)]/90 font-semibold tracking-wider mt-auto">
                  Track Order
                </Button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-70">
                <p>No active orders.</p>
                <Link href="/shop" className="text-[var(--gold-400)] hover:underline mt-2 text-sm">Explore Elixirs</Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Orders List */}
        <Card className="bg-[var(--glass-panel)] backdrop-blur-md border-white/10 shadow-2xl rounded-2xl overflow-hidden text-white">
          <CardContent className="p-8">
             <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <h3 className="font-serif text-2xl text-[var(--gold-400)]">Order History</h3>
              <Link href="/account/orders" className="text-sm text-[var(--gold-400)] hover:underline flex items-center gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {historyOrders.length > 0 ? historyOrders.map((order, idx) => (
                <div key={order.id} className={`flex items-center justify-between text-sm py-2 ${idx !== 0 ? 'border-t border-white/5' : ''}`}>
                  <div>
                    <p className="font-semibold">#{order.id.slice(-6).toUpperCase()}</p>
                    <p className="opacity-60">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{order.total.toFixed(2)}</p>
                    <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white mt-1">
                      {order.status}
                    </span>
                  </div>
                </div>
              )) : (
                <p className="text-sm opacity-70 text-center py-4">You have no past orders.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Collections Promo */}
      <section className="pt-8 border-t border-white/10">
        <h3 className="font-serif text-2xl text-[var(--gold-400)] mb-6">Curated For You</h3>
        {curatedProducts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {curatedProducts.map(product => (
              <Link href={`/product/${product.slug}`} key={product.id}>
                <Card className="bg-[var(--glass-panel)] border-white/5 overflow-hidden group hover:border-[var(--gold-400)]/30 transition-colors cursor-pointer text-white h-full flex flex-col">
                  <div className="aspect-[4/3] bg-black/40 relative">
                    {product.images && (() => {
                      try {
                        const parsed = JSON.parse(product.images);
                        const firstImage = Array.isArray(parsed) ? parsed[0] : parsed;
                        return firstImage ? <img src={firstImage} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" /> : null;
                      } catch {
                        return <img src={product.images} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />;
                      }
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h4 className="font-serif text-lg text-[var(--gold-400)]">{product.name}</h4>
                      <p className="text-xs opacity-70">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm opacity-70">No products available at the moment.</p>
        )}
      </section>
    </div>
  )
}
