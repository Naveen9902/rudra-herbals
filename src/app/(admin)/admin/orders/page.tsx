import { getOrders } from "@/app/actions/order-actions"
import { OrderStatusSelect } from "./order-status-select"

export const dynamic = "force-dynamic"

export default async function AdminOrdersPage() {
  const { success, orders, error } = await getOrders()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Orders</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {(!success || !orders || orders.length === 0) ? (
          <div className="p-8 text-center text-gray-500">
            {error ? error : "No orders found. When customers check out, their orders will appear here."}
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold text-xs">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">UTR (Ref)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 font-mono text-xs">
                    {order.id.slice(-8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="font-medium text-gray-900">{order.user.name || "Guest"}</div>
                    <div className="text-xs">{order.user.email}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-mono text-xs">
                    {order.paymentRef || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">
                    ₹{order.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
