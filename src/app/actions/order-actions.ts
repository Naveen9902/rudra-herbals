"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
                images: true
              }
            }
          }
        },
        address: true
      }
    })
    return { success: true, orders }
  } catch (error) {
    console.error("Failed to fetch orders:", error)
    return { success: false, error: "Failed to fetch orders" }
  }
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    const validStatuses = ["pending", "paid", "shipped", "delivered", "cancelled"]
    if (!validStatuses.includes(newStatus)) {
      return { success: false, error: "Invalid status" }
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus }
    })

    revalidatePath("/admin/orders")
    return { success: true, order }
  } catch (error) {
    console.error("Failed to update order status:", error)
    return { success: false, error: "Failed to update order status" }
  }
}
