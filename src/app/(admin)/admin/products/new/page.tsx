import { prisma } from "@/lib/db"
import { ProductForm } from "./product-form"

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  })

  // If no categories exist, we should probably handle it, but for now we'll just pass an empty array
  // The form will handle it or we can provide a default fallback category.

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add New Product</h1>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <ProductForm categories={categories} />
      </div>
    </div>
  )
}
