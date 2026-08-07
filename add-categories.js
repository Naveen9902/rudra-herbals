const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: 'Elixirs', slug: 'elixirs' },
      { name: 'Teas', slug: 'teas' },
      { name: 'Botanicals', slug: 'botanicals' },
      { name: 'Serums', slug: 'serums' },
      { name: 'Hair Oils', slug: 'hair-oils' }
    ],
    skipDuplicates: true
  });
  console.log('Categories added');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
