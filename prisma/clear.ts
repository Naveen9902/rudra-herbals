import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting to clear database...')

  // Delete all records from all tables, in reverse order of dependencies
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.subscription.deleteMany()
  
  await prisma.productTag.deleteMany()
  await prisma.tag.deleteMany()
  
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  
  await prisma.address.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()
  
  await prisma.journalPost.deleteMany()
  await prisma.verificationToken.deleteMany()

  console.log('Database successfully cleared.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
