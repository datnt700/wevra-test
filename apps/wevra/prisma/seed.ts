/**
 * Prisma Seed Script
 * Creates test user for development
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create test user with hashed password
  const hashedPassword = await bcrypt.hash('password', 10);

  const testUser = await prisma.user.upsert({
    where: { email: 'test@wevra.com' },
    update: {},
    create: {
      email: 'test@wevra.com',
      name: 'Test User',
      password: hashedPassword,
      onboardingCompleted: false,
      currentStage: 'STARTER',
    },
  });

  console.log('✅ Test user created:', testUser.email);
  console.log('   Email: test@wevra.com');
  console.log('   Password: password');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
