import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    // For our mock demo, we'll allow guest checkout by assigning to a default user 
    // or the logged in user.
    let userId = ""
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email }
      })
      if (user) userId = user.id
    }

    if (!userId) {
      // If not logged in, we need a user to attach the order to. 
      // For this demo, let's just find the first user in the DB (usually the guest or admin).
      const fallbackUser = await prisma.user.findFirst()
      if (!fallbackUser) {
        return new NextResponse("No users found to attach order", { status: 400 })
      }
      userId = fallbackUser.id
    }

    const { items, address } = await req.json()

    if (!items || items.length === 0) {
      return new NextResponse("Cart is empty", { status: 400 })
    }

    if (!address) {
      return new NextResponse("Address is required", { status: 400 })
    }

    // Calculate totals
    const subtotal = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0)
    const shipping = 0 // Complimentary
    const tax = 0 // Mock tax
    const total = subtotal + shipping + tax

    // 1. Create the Address
    const savedAddress = await prisma.address.create({
      data: {
        userId: userId,
        line1: address.line1,
        line2: address.line2 || "",
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
      }
    })

    // 2. Create the Order
    const order = await prisma.order.create({
      data: {
        userId: userId,
        status: "paid", // Instantly paid in our mock flow
        subtotal,
        shipping,
        tax,
        total,
        shippingAddressId: savedAddress.id,
        paymentRef: `mock_ch_${Math.random().toString(36).substring(7)}`,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            nameSnapshot: item.name,
            priceSnapshot: item.price,
            quantity: item.quantity,
            variantName: item.variantName || null,
          }))
        }
      }
    })

    // 3. Return the new Order ID to redirect the user
    return NextResponse.json({ url: `/checkout/success?session_id=${order.id}` })
    
  } catch (error) {
    console.error("[CHECKOUT_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
