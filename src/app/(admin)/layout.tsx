import Link from "next/link"
import { Package, ShoppingCart, LayoutDashboard } from "lucide-react"
import { AdminLogoutButton } from "@/components/admin/logout-button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-100">
          <Link href="/admin" className="font-serif text-xl italic font-semibold text-gray-900 tracking-wide block">
            Rudra Admin
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
            <LayoutDashboard className="h-4 w-4 text-gray-400" /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
            <Package className="h-4 w-4 text-gray-400" /> Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
            <ShoppingCart className="h-4 w-4 text-gray-400" /> Orders
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
