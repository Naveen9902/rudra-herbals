const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.tag.createMany({
    data: [
      { label: 'Hair Oil' },
      { label: 'Serum' }
    ],
    skipDuplicates: true
  });
  console.log('Tags added');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
