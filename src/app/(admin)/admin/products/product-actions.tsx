"use client"

import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { deleteProduct } from "@/app/actions/product-actions"
import { useRouter } from "next/navigation"

export function ProductRowActions({ productId }: { productId: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      const res = await deleteProduct(productId)
      if (res.success) {
        router.refresh()
      } else {
        alert(res.error || "Failed to delete product")
      }
    }
  }

  return (
    <div className="flex justify-end space-x-2">
      <Link href={`/admin/products/${productId}/edit`} className="text-gray-400 hover:text-gray-900 transition-colors">
        <Pencil className="h-4 w-4 inline" />
      </Link>
      <button onClick={handleDelete} className="text-gray-400 hover:text-red-600 transition-colors">
        <Trash2 className="h-4 w-4 inline" />
      </button>
    </div>
  )
}
