import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import { ProductForm } from "../../new/product-form"

export default async function EditProductPage({ params }: { params: { id: string } }) {
  // Await params object for next 15 compatibility if needed
  const { id } = await params
  
  const product = await prisma.product.findUnique({
    where: { id }
  })
  
  if (!product) return notFound()
  
  const categories = await prisma.category.findMany()
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Product</h1>
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <ProductForm categories={categories} initialData={product} />
      </div>
    </div>
  )
}
