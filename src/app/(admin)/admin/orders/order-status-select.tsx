"use client"

import { useState } from "react"
import { updateOrderStatus } from "@/app/actions/order-actions"
import { useRouter } from "next/navigation"

export function OrderStatusSelect({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    setIsUpdating(true)
    
    try {
      const res = await updateOrderStatus(orderId, newStatus)
      if (res.success) {
        // Optionally add a toast here
        router.refresh()
      } else {
        alert("Failed to update status: " + res.error)
      }
    } catch (error) {
      alert("Something went wrong.")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <select 
      value={currentStatus} 
      onChange={handleStatusChange}
      disabled={isUpdating}
      className={`text-sm font-medium rounded-full px-3 py-1 border-0 ring-1 ring-inset ${
        currentStatus === 'delivered' ? 'bg-green-50 text-green-700 ring-green-600/20' : 
        currentStatus === 'shipped' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' : 
        currentStatus === 'cancelled' ? 'bg-red-50 text-red-700 ring-red-600/20' : 
        'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
      } cursor-pointer hover:bg-opacity-80 transition-opacity focus:ring-2`}
    >
      <option value="pending" className="bg-white text-gray-900">Pending</option>
      <option value="paid" className="bg-white text-gray-900">Paid</option>
      <option value="shipped" className="bg-white text-gray-900">Shipped</option>
      <option value="delivered" className="bg-white text-gray-900">Delivered</option>
      <option value="cancelled" className="bg-white text-gray-900">Cancelled</option>
    </select>
  )
}
