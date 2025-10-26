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
  const restaurant1 = await prisma.restaurant.upsert({
    where: { slug: 'the-cozy-cafe' },
    update: {},
    create: {
      name: 'The Cozy Café',
      slug: 'the-cozy-cafe',
      description:
        'A warm and inviting café serving artisan coffee and homemade pastries. Perfect for a relaxing afternoon.',
      address: '123 Main Street, Downtown',
      phone: '+1 234-567-8900',
      email: 'hello@cozycafe.com',
      image: '/restaurants/cozy-cafe.jpg',
      cuisine: ['Café', 'Bakery', 'Breakfast'],
      priceRange: '$$',
      rating: 4.5,
      isActive: true,
    },
  });

  const restaurant2 = await prisma.restaurant.upsert({
    where: { slug: 'italian-bistro' },
    update: {},
    create: {
      name: 'Italian Bistro',
      slug: 'italian-bistro',
      description:
        'Authentic Italian cuisine with fresh pasta made daily. Experience the taste of Italy in every bite.',
      address: '456 Oak Avenue, City Center',
      phone: '+1 234-567-8901',
      email: 'info@italianbistro.com',
      image: '/restaurants/italian-bistro.jpg',
      cuisine: ['Italian', 'Pasta', 'Pizza'],
      priceRange: '$$$',
      rating: 4.8,
      isActive: true,
    },
  });

  console.log('✅ Created restaurants:', restaurant1.name, restaurant2.name);

  // Create tables for restaurant 1
  const tables1 = await Promise.all([
    prisma.table.create({
      data: {
        restaurantId: restaurant1.id,
        number: 'T1',
        capacity: 2,
        isAvailable: true,
      },
    }),
    prisma.table.create({
      data: {
        restaurantId: restaurant1.id,
        number: 'T2',
        capacity: 4,
        isAvailable: true,
      },
    }),
    prisma.table.create({
      data: {
        restaurantId: restaurant1.id,
        number: 'T3',
        capacity: 6,
        isAvailable: true,
      },
    }),
  ]);

  // Create tables for restaurant 2
  const tables2 = await Promise.all([
    prisma.table.create({
      data: {
        restaurantId: restaurant2.id,
        number: 'A1',
        capacity: 2,
        isAvailable: true,
      },
    }),
    prisma.table.create({
      data: {
        restaurantId: restaurant2.id,
        number: 'A2',
        capacity: 4,
        isAvailable: true,
      },
    }),
    prisma.table.create({
      data: {
        restaurantId: restaurant2.id,
        number: 'B1',
        capacity: 8,
        isAvailable: true,
      },
    }),
  ]);

  console.log('✅ Created tables:', tables1.length + tables2.length, 'tables total');

  // Create a sample booking
  const booking = await prisma.booking.create({
    data: {
      userId: admin.id,
      restaurantId: restaurant1.id,
      tableId: tables1[0]!.id,
      date: new Date('2025-10-30'),
      time: '18:00',
      guests: 2,
      status: 'CONFIRMED',
      notes: 'Window seat preferred',
    },
  });

  console.log('✅ Created sample booking:', booking.id);

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
