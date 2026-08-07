"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("image") as File | null
    if (!file) {
      throw new Error("No file uploaded")
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "rudra_products" },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    return { success: true, url: (uploadResult as any).secure_url }
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error)
    return { success: false, error: "Failed to upload image" }
  }
}

export async function createProduct(data: {
  name: string
  slug: string
  shortDescription: string
  longDescription: string
  price: number
  potency: string
  categoryId: string
  images: string
  efficacy?: string
  ritual?: string
}) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        price: data.price,
        potency: data.potency,
        categoryId: data.categoryId,
        images: data.images, // JSON string of URLs e.g., '["/uploads/image.png"]'
        efficacy: data.efficacy,
        ritual: data.ritual,
        isActive: true,
      },
    })

    revalidatePath("/admin/products")
    revalidatePath("/shop")
    
    return { success: true, product }
  } catch (error) {
    console.error("Error creating product:", error)
    return { success: false, error: "Failed to create product" }
  }
}
