import { Card, CardContent } from '@/components/ui/card'
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Package } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AccountOrdersPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) redirect("/login")

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { product: true } } }
  })

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header>
        <h1 className="font-serif text-4xl text-[var(--gold-400)] mb-2">Order History</h1>
        <p className="text-white/70">Track your recent purchases and shipments.</p>
      </header>
      
      {orders.length === 0 ? (
        <Card className="bg-[var(--glass-panel)] backdrop-blur-md border-white/10 shadow-2xl rounded-2xl overflow-hidden text-white">
          <CardContent className="p-12 text-center space-y-4">
            <Package className="w-12 h-12 text-[var(--gold-400)] mx-auto opacity-50 mb-6" />
            <p className="opacity-80 text-lg mb-4">You haven't placed any orders yet.</p>
            <Link href="/shop">
              <Button className="bg-[var(--gold-400)] text-black hover:bg-[var(--gold-500)]">
                Browse Apothecary
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <Card key={order.id} className="bg-[var(--glass-panel)] backdrop-blur-md border-white/10 shadow-2xl rounded-2xl overflow-hidden text-white">
              <div className="border-b border-white/10 bg-white/5 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--gold-400)] mb-1">Order #{order.id.slice(-8).toUpperCase()}</p>
                  <p className="text-sm opacity-80">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-left md:text-right">
                    <p className="text-xs opacity-80 uppercase tracking-wider">Total</p>
                    <p className="font-medium text-[var(--gold-400)]">₹{order.total.toFixed(2)}</p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase ${order.status === 'delivered' ? 'bg-green-900/50 text-green-400' : 'bg-[var(--gold-400)]/20 text-[var(--gold-400)]'}`}>
                    {order.status}
                  </div>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                {order.items.map(item => {
                  let image = ""
                  if (item.product.images) {
                    try {
                      image = JSON.parse(item.product.images)[0]
                    } catch(e) {}
                  }
                  
                  return (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/10 overflow-hidden shrink-0">
                        {image ? (
                          <img src={image} alt={item.product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-white/10" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">{item.product.name}</p>
                        <p className="text-sm opacity-70">Qty: {item.quantity} {item.variantName ? `| ${item.variantName}` : ''}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-white">₹{(item.priceSnapshot * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
