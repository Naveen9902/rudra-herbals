"use client"

import { useState } from "react"
import { uploadImage, createProduct, updateProduct } from "@/app/actions/product-actions"
import { useRouter } from "next/navigation"

export function ProductForm({ categories, initialData }: { categories: any[], initialData?: any }) {
  const router = useRouter()
  const isEdit = !!initialData
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    shortDescription: initialData?.shortDescription || "",
    longDescription: initialData?.longDescription || "",
    potency: initialData?.potency || "Standard",
    categoryId: initialData?.categoryId || (categories.length > 0 ? categories[0].id : ""),
  })
  
  const [variants, setVariants] = useState(() => {
    if (initialData?.variants) return JSON.parse(initialData.variants).map((v:any) => ({...v, price: String(v.price)}))
    return [{ name: "30 ml", price: "25.00" }]
  })

  const [efficacy, setEfficacy] = useState(() => {
    if (initialData?.efficacy) return JSON.parse(initialData.efficacy)
    return [
      { title: "Cold-Extracted", description: "Processed below 118°F to preserve delicate volatile oils and therapeutic compounds." },
      { title: "Bioavailable", description: "Formulated with natural lipid carriers to ensure maximum cellular absorption." },
      { title: "Purity Tested", description: "Rigorously screened for heavy metals, pesticides, and microbial contaminants." }
    ]
  })

  const [ritual, setRitual] = useState(() => {
    if (initialData?.ritual) return JSON.parse(initialData.ritual)
    return [
      { title: "Dose", description: "Take one full dropper (1ml) or steep one teaspoon in warm water." },
      { title: "Timing", description: "Best consumed on an empty stomach, either first thing in the morning or 30 minutes before rest." },
      { title: "Sustain", description: "Adaptogens build cumulatively. Consistent daily use for 4-6 weeks yields optimal resilience." }
    ]
  })
  
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleVariantChange = (index: number, field: 'name' | 'price', value: string) => {
    const newVariants = [...variants]
    newVariants[index] = { ...newVariants[index], [field]: value }
    setVariants(newVariants)
  }

  const addVariant = () => setVariants([...variants, { name: "", price: "" }])
  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      const newVariants = [...variants]
      newVariants.splice(index, 1)
      setVariants(newVariants)
    }
  }

  const handleEfficacyChange = (index: number, field: 'title' | 'description', value: string) => {
    const newEfficacy = [...efficacy]
    newEfficacy[index][field] = value
    setEfficacy(newEfficacy)
  }

  const handleRitualChange = (index: number, field: 'title' | 'description', value: string) => {
    const newRitual = [...ritual]
    newRitual[index][field] = value
    setRitual(newRitual)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const generateSlug = () => {
    if (formData.name) {
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      let imageUrl = initialData?.images ? JSON.parse(initialData.images)[0] : ""
      
      // 1. Upload image if present
      if (imageFile) {
        const data = new FormData()
        data.append("image", imageFile)
        const uploadResult = await uploadImage(data)
        
        if (uploadResult.success && uploadResult.url) {
          imageUrl = uploadResult.url
        } else {
          throw new Error(uploadResult.error || "Failed to upload image")
        }
      } else if (!isEdit) {
        throw new Error("Please upload a product image.")
      }

      // Calculate lowest price for the base price
      const validVariants = variants.filter(v => v.name && v.price)
      if (validVariants.length === 0) throw new Error("At least one valid variant is required.")
      
      const parsedVariants = validVariants.map(v => ({ name: v.name, price: parseFloat(v.price) }))
      const basePrice = Math.min(...parsedVariants.map(v => v.price))

      // 2. Create or Update product
      const productPayload = {
        ...formData,
        price: basePrice,
        variants: JSON.stringify(parsedVariants),
        images: JSON.stringify([imageUrl]),
        efficacy: JSON.stringify(efficacy),
        ritual: JSON.stringify(ritual),
      }

      let productResult;
      if (isEdit) {
        productResult = await updateProduct(initialData.id, productPayload)
      } else {
        productResult = await createProduct(productPayload)
      }

      if (productResult.success) {
        router.push("/admin/products")
        router.refresh()
      } else {
        throw new Error(productResult.error || (isEdit ? "Failed to update product" : "Failed to create product"))
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (categories.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md">
        <p>Warning: No categories found in the database. Please create a category first to add products.</p>
        <p className="text-sm mt-2">You can use a database tool or Prisma Studio to add a category.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="p-4 bg-red-50 text-red-800 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            value={formData.name} 
            onChange={handleChange}
            onBlur={generateSlug}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
          <input 
            type="text" 
            id="slug" 
            name="slug" 
            required 
            value={formData.slug} 
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">Short Description</label>
        <input 
          type="text" 
          id="shortDescription" 
          name="shortDescription" 
          required 
          value={formData.shortDescription} 
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700">Long Description</label>
        <textarea 
          id="longDescription" 
          name="longDescription" 
          required 
          rows={4}
          value={formData.longDescription} 
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="potency" className="block text-sm font-medium text-gray-700">Potency</label>
          <select 
            id="potency" 
            name="potency" 
            required 
            value={formData.potency} 
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          >
            <option value="Gentle">Gentle</option>
            <option value="Standard">Standard</option>
            <option value="Reserve">Reserve</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category</label>
          <select 
            id="categoryId" 
            name="categoryId" 
            required 
            value={formData.categoryId} 
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Sizes / Variants</h3>
          <button type="button" onClick={addVariant} className="text-sm font-medium text-gray-900 hover:underline border border-gray-300 px-3 py-1 rounded-md">Add Size</button>
        </div>
        {variants.map((variant, index) => (
          <div key={`var-${index}`} className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700">Size Label (e.g. 30 ml)</label>
              <input 
                type="text" 
                required
                value={variant.name} 
                onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
              <input 
                type="number" 
                min="0"
                step="0.01"
                required
                value={variant.price} 
                onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
            {variants.length > 1 && (
              <div className="pt-5">
                <button type="button" onClick={() => removeVariant(index)} className="text-red-600 hover:text-red-800 font-bold p-2">✕</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Clinical Efficacy (3 Points)</h3>
        {efficacy.map((item, index) => (
          <div key={`eff-${index}`} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-gray-700">Point {index + 1} Title</label>
              <input 
                type="text" 
                required
                value={item.title} 
                onChange={(e) => handleEfficacyChange(index, 'title', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700">Description</label>
              <input 
                type="text" 
                required
                value={item.description} 
                onChange={(e) => handleEfficacyChange(index, 'description', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">The Daily Ritual (3 Steps)</h3>
        {ritual.map((item, index) => (
          <div key={`rit-${index}`} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-gray-700">Step {index + 1} Title</label>
              <input 
                type="text" 
                required
                value={item.title} 
                onChange={(e) => handleRitualChange(index, 'title', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700">Description</label>
              <input 
                type="text" 
                required
                value={item.description} 
                onChange={(e) => handleRitualChange(index, 'description', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 pt-6 border-t border-gray-200">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
        <input 
          type="file" 
          id="image" 
          name="image" 
          accept="image/*" 
          required 
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
        />
        {imageFile && (
          <p className="text-sm text-gray-500 mt-2">Selected file: {imageFile.name}</p>
        )}
      </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-gray-50 shadow hover:bg-gray-900/90 h-9 px-8 py-2"
          >
            {isSubmitting ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update Product" : "Create Product")}
          </button>
        </div>
    </form>
  )
}
