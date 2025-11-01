import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create test users with hashed passwords
  console.log('👥 Creating test users...');

  // Admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@tavia.io' },
    update: {},
    create: {
      email: 'admin@tavia.io',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Restaurant owner user
  const ownerPassword = await bcrypt.hash('owner123', 10);
  const owner = await prisma.user.upsert({
    where: { email: 'owner@example.com' },
    update: {},
    create: {
      email: 'owner@example.com',
      name: 'Restaurant Owner',
      password: ownerPassword,
      role: 'RESTAURANT_OWNER',
      emailVerified: new Date(),
    },
  });
  console.log('✅ Created restaurant owner:', owner.email);

  // Regular user (cannot access backoffice)
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: userPassword,
      role: 'USER',
      emailVerified: new Date(),
    },
  });
  console.log('✅ Created regular user:', user.email, '(cannot access backoffice)');

  // Create sample restaurants
  console.log('🍽️  Creating sample restaurants...');

  const restaurants = [
    {
      name: 'Le Jardin Secret',
      slug: 'le-jardin-secret',
      description:
        'Elegant French dining with a modern twist. Our seasonal menu features the finest ingredients sourced from local producers.',
      address: '15 Rue de la Paix, Paris 75002',
      phone: '+33 1 42 60 30 30',
      email: 'contact@lejardinsecret.fr',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      cuisine: ['French', 'Fine Dining'],
      priceRange: '$$$',
      rating: 4.8,
      reviewCount: 342,
      latitude: 48.8698,
      longitude: 2.3308,
      isOpen: true,
      isActive: true,
    },
    {
      name: 'Sushi Master',
      slug: 'sushi-master',
      description:
        'Authentic Japanese sushi and omakase experience. Master chefs trained in Tokyo bring traditional techniques to every dish.',
      address: '42 Boulevard Saint-Germain, Paris 75005',
      phone: '+33 1 43 26 48 23',
      email: 'reservation@sushimaster.fr',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop',
      cuisine: ['Japanese', 'Sushi', 'Omakase'],
      priceRange: '$$$$',
      rating: 4.9,
      reviewCount: 521,
      latitude: 48.8534,
      longitude: 2.3488,
      isOpen: true,
      isActive: true,
    },
    {
      name: 'Trattoria Bella',
      slug: 'trattoria-bella',
      description:
        'Traditional Italian cuisine in a cozy atmosphere. Homemade pasta and wood-fired pizzas made with love and authentic recipes.',
      address: '23 Avenue des Champs-Élysées, Paris 75008',
      phone: '+33 1 53 89 90 91',
      email: 'info@trattoriabella.fr',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
      cuisine: ['Italian', 'Pasta', 'Pizza'],
      priceRange: '$$',
      rating: 4.6,
      reviewCount: 218,
      latitude: 48.8698,
      longitude: 2.3077,
      isOpen: false,
      isActive: true,
    },
    {
      name: 'The Steakhouse',
      slug: 'the-steakhouse',
      description:
        'Premium cuts and fine wines. Dry-aged beef and exceptional service in an elegant setting.',
      address: '78 Rue du Faubourg Saint-Honoré, Paris 75008',
      phone: '+33 1 53 05 13 13',
      email: 'reservation@thesteakhouse.fr',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop',
      cuisine: ['Steakhouse', 'American', 'Grill'],
      priceRange: '$$$$',
      rating: 4.7,
      reviewCount: 456,
      latitude: 48.8708,
      longitude: 2.3153,
      isOpen: true,
      isActive: true,
    },
    {
      name: 'Spice & Soul',
      slug: 'spice-and-soul',
      description:
        'Authentic Indian flavors and tandoori specialties. A journey through the diverse regions of India.',
      address: '56 Rue de Rivoli, Paris 75004',
      phone: '+33 1 42 71 43 33',
      email: 'hello@spiceandsoul.fr',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop',
      cuisine: ['Indian', 'Tandoori', 'Curry'],
      priceRange: '$$',
      rating: 4.5,
      reviewCount: 289,
      latitude: 48.8566,
      longitude: 2.3522,
      isOpen: true,
      isActive: true,
    },
    {
      name: 'Ocean & Co',
      slug: 'ocean-and-co',
      description:
        'Fresh seafood with a Mediterranean touch. Daily catches and sustainable fishing practices.',
      address: '34 Quai de la Tournelle, Paris 75005',
      phone: '+33 1 43 54 17 47',
      email: 'contact@oceanandco.fr',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
      cuisine: ['Seafood', 'Mediterranean', 'French'],
      priceRange: '$$$',
      rating: 4.8,
      reviewCount: 387,
      latitude: 48.8507,
      longitude: 2.3549,
      isOpen: true,
      isActive: true,
    },
  ];

  const createdRestaurants = [];
  for (const restaurantData of restaurants) {
    const restaurant = await prisma.restaurant.upsert({
      where: { slug: restaurantData.slug },
      update: {},
      create: restaurantData,
    });
    createdRestaurants.push(restaurant);
    console.log('✅ Created restaurant:', restaurant.name);
  }

  // Create tables for each restaurant
  console.log('🪑 Creating tables for restaurants...');
  let totalTables = 0;

  for (const restaurant of createdRestaurants) {
    const tables = await Promise.all([
      prisma.table.upsert({
        where: { restaurantId_number: { restaurantId: restaurant.id, number: 'T1' } },
        update: {},
        create: {
          restaurantId: restaurant.id,
          number: 'T1',
          capacity: 2,
          isAvailable: true,
        },
      }),
      prisma.table.upsert({
        where: { restaurantId_number: { restaurantId: restaurant.id, number: 'T2' } },
        update: {},
        create: {
          restaurantId: restaurant.id,
          number: 'T2',
          capacity: 4,
          isAvailable: true,
        },
      }),
      prisma.table.upsert({
        where: { restaurantId_number: { restaurantId: restaurant.id, number: 'T3' } },
        update: {},
        create: {
          restaurantId: restaurant.id,
          number: 'T3',
          capacity: 4,
          isAvailable: true,
        },
      }),
      prisma.table.upsert({
        where: { restaurantId_number: { restaurantId: restaurant.id, number: 'T4' } },
        update: {},
        create: {
          restaurantId: restaurant.id,
          number: 'T4',
          capacity: 6,
          isAvailable: true,
        },
      }),
    ]);
    totalTables += tables.length;
  }

  console.log('✅ Created tables:', totalTables, 'tables total');

  // Create sample bookings
  console.log('📅 Creating sample bookings...');
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const firstRestaurant = createdRestaurants[0]!;
  const firstRestaurantTables = await prisma.table.findMany({
    where: { restaurantId: firstRestaurant.id },
  });

  await prisma.booking.upsert({
    where: { id: 'booking-1' },
    update: {},
    create: {
      id: 'booking-1',
      userId: admin.id,
      restaurantId: firstRestaurant.id,
      tableId: firstRestaurantTables[0]!.id,
      date: tomorrow,
      time: '19:00',
      guests: 2,
      status: 'CONFIRMED',
      notes: 'Anniversary dinner',
    },
  });

  await prisma.booking.upsert({
    where: { id: 'booking-2' },
    update: {},
    create: {
      id: 'booking-2',
      userId: user.id,
      restaurantId: createdRestaurants[1]!.id,
      date: nextWeek,
      time: '20:00',
      guests: 4,
      status: 'PENDING',
      notes: 'Window seat if possible',
    },
  });

  console.log('✅ Created sample bookings');

  console.log('\n📋 Test Users Summary:');
  console.log('┌─────────────────────────────────────────────────────────┐');
  console.log('│  ADMIN USER (Full Access)                               │');
  console.log('│  Email: admin@tavia.io                                  │');
  console.log('│  Password: admin123                                     │');
  console.log('├─────────────────────────────────────────────────────────┤');
  console.log('│  RESTAURANT OWNER (Own Restaurants)                     │');
  console.log('│  Email: owner@example.com                               │');
  console.log('│  Password: owner123                                     │');
  console.log('├─────────────────────────────────────────────────────────┤');
  console.log('│  REGULAR USER (Cannot Access Backoffice)                │');
  console.log('│  Email: user@example.com                                │');
  console.log('│  Password: user123                                      │');
  console.log('└─────────────────────────────────────────────────────────┘\n');

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
