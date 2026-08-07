const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "test_customer@example.com",
      name: "Test Customer",
      role: "customer"
    }
  })

  const address = await prisma.address.create({
    data: {
      userId: user.id,
      line1: "123 Herbal Way",
      city: "Ayurveda City",
      state: "CA",
      postalCode: "90210",
      country: "USA",
    }
  })

  // We need a real product for the order items
  const product = await prisma.product.findFirst()

  if (!product) {
    console.log("No product found. Please seed products first.")
    return
  }

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      status: "pending",
      subtotal: product.price * 2,
      shipping: 5.00,
      tax: 0.00,
      total: product.price * 2 + 5.00,
      shippingAddressId: address.id,
      items: {
        create: [
          {
            productId: product.id,
            nameSnapshot: product.name,
            priceSnapshot: product.price,
            quantity: 2
          }
        ]
      }
    }
  })

  console.log("Test order created successfully:", order.id)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
