import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clean up existing data
  await prisma.productTag.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.tag.deleteMany()

  // Create Categories
  const categoryElixirs = await prisma.category.create({
    data: { name: 'Elixirs', slug: 'elixirs' }
  })
  const categoryTinctures = await prisma.category.create({
    data: { name: 'Tinctures & Drops', slug: 'tinctures' }
  })
  const categoryTeas = await prisma.category.create({
    data: { name: 'Teas & Tisanes', slug: 'teas' }
  })
  const categoryBalms = await prisma.category.create({
    data: { name: 'Balms', slug: 'balms' }
  })

  // Create Tags
  const tagOrganic = await prisma.tag.create({ data: { label: 'Organic' } })
  const tagCalming = await prisma.tag.create({ data: { label: 'Calming' } })
  const tagAdaptogenic = await prisma.tag.create({ data: { label: 'Adaptogenic' } })
  const tagWildHarvested = await prisma.tag.create({ data: { label: 'Wild-Harvested' } })
  const tagFocus = await prisma.tag.create({ data: { label: 'Focus' } })
  const tagImmunity = await prisma.tag.create({ data: { label: 'Immunity' } })

  // Helper for generating random prices
  const getPrice = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

  // Products Data
  const products = [
    {
      name: 'Ashwagandha Reserve',
      shortDescription: 'Clinical-grade adaptogen for systemic resilience and cortisol balance.',
      longDescription: 'Our Ashwagandha Reserve is sourced from ethical, wild-harvested roots and cold-extracted for maximum potency. Experience deep calm and restored energy levels.',
      category: categoryElixirs,
      tags: [tagAdaptogenic, tagOrganic, tagWildHarvested],
      potency: 'Reserve',
      price: 68.00,
    },
    {
      name: 'Brahmi Nectar',
      shortDescription: 'Awaken your mind with this ancient cognitive elixir.',
      longDescription: 'Brahmi has been used for centuries to support memory and focus. Formulated with modern clinical precision for a calm, clear mind.',
      category: categoryElixirs,
      tags: [tagOrganic, tagFocus],
      potency: 'Standard',
      price: 45.00,
    },
    {
      name: 'Tulsi Essence',
      shortDescription: 'Pure Holy Basil extract to elevate mood and immune response.',
      longDescription: 'Known as the Queen of Herbs, Tulsi offers unparalleled adaptogenic benefits, helping your body respond gracefully to daily stressors.',
      category: categoryTinctures,
      tags: [tagAdaptogenic, tagImmunity],
      potency: 'Standard',
      price: 38.00,
    },
    {
      name: 'Midnight Rest Tincture',
      shortDescription: 'A potent botanical blend for deep, uninterrupted sleep.',
      longDescription: 'Soothe the nervous system with our cold-pressed Midnight Rest Tincture. Wake up refreshed and ready for your morning ritual.',
      category: categoryTinctures,
      tags: [tagCalming, tagWildHarvested],
      potency: 'Gentle',
      price: 52.00,
    },
    {
      name: 'Clarity Focus Drops',
      shortDescription: 'Fast-acting botanical intelligence for sustained concentration.',
      longDescription: 'Clear the mental fog. Our Clarity Focus Drops are designed to be part of your deep work ritual, providing a jitter-free cognitive lift.',
      category: categoryTinctures,
      tags: [tagFocus, tagOrganic],
      potency: 'Standard',
      price: 48.00,
    },
    {
      name: 'Forest Breath Balm',
      shortDescription: 'Invigorating topical balm to open airways and ground the spirit.',
      longDescription: 'Breathe deeply. Infused with wild-harvested evergreens and eucalyptus, this balm connects you instantly to the forest floor.',
      category: categoryBalms,
      tags: [tagWildHarvested],
      potency: 'Gentle',
      price: 28.00,
    },
    {
      name: 'Evening Rest Tisane',
      shortDescription: 'A delicate herbal infusion to signal the end of your day.',
      longDescription: 'Let go of the day’s tension with our Evening Rest Tisane. A soothing blend of chamomile, valerian, and subtle lavender notes.',
      category: categoryTeas,
      tags: [tagCalming, tagOrganic],
      potency: 'Gentle',
      price: 32.00,
    },
    {
      name: 'Ceremonial Matcha',
      shortDescription: 'Shade-grown, stone-milled green tea for morning clarity.',
      longDescription: 'Our Ceremonial Matcha provides a sustained, calm energy lift. Rich in L-theanine and antioxidants, it is the perfect anchor for your morning ritual.',
      category: categoryTeas,
      tags: [tagFocus, tagOrganic],
      potency: 'Standard',
      price: 65.00,
    },
    {
      name: 'Golden Milk Elixir',
      shortDescription: 'Anti-inflammatory turmeric and spice blend for systemic warmth.',
      longDescription: 'An ancient Ayurvedic staple. Our Golden Milk Elixir balances inflammation and supports a robust immune system with high-curcumin turmeric.',
      category: categoryElixirs,
      tags: [tagImmunity, tagCalming],
      potency: 'Standard',
      price: 42.00,
    },
    {
      name: 'Saffron Infusion',
      shortDescription: 'The world’s most precious spice, concentrated for mood elevation.',
      longDescription: 'Clinically studied for its mood-enhancing properties, our Saffron Infusion brings a golden, uplifting aura to your daily routine.',
      category: categoryTinctures,
      tags: [tagAdaptogenic, tagOrganic],
      potency: 'Reserve',
      price: 85.00,
    }
  ]

  for (const p of products) {
    // Generate a simple slug
    const slug = p.name.toLowerCase().replace(/ /g, '-')
    // Mock image for now
    const images = JSON.stringify(['/images/products/placeholder.jpg'])
    
    await prisma.product.create({
      data: {
        name: p.name,
        slug,
        shortDescription: p.shortDescription,
        longDescription: p.longDescription,
        price: p.price,
        potency: p.potency,
        categoryId: p.category.id,
        images,
        tags: {
          create: p.tags.map(tag => ({
            tag: {
              connect: { id: tag.id }
            }
          }))
        }
      }
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
