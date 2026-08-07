import { prisma } from "@/lib/db"

export default async function AdminDashboard() {
  const productCount = await prisma.product.count()
  // const orderCount = await prisma.order.count() // Phase 6 Orders not fully modeled yet in mock

  return (
    <div className="space-y-6 animate-in fade-in">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Total Products</h3>
          <p className="text-4xl font-semibold text-gray-900">{productCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Total Orders</h3>
          <p className="text-4xl font-semibold text-gray-900">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Revenue</h3>
          <p className="text-4xl font-semibold text-gray-900">$1,240.00</p>
        </div>
      </div>
    </div>
  )
}
