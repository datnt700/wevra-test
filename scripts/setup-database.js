#!/usr/bin/env node

/**
 * Complete database setup script for Tavia
 * Sets up shared database for both frontoffice and backoffice
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const BACKOFFICE_DIR = path.join(__dirname, '..', 'apps', 'backoffice');
const FRONTOFFICE_DIR = path.join(__dirname, '..', 'apps', 'frontoffice');

function run(command, cwd) {
  console.log(`\n🔧 Running: ${command}`);
  console.log(`   In: ${cwd}\n`);
  try {
    execSync(command, {
      cwd,
      stdio: 'inherit',
      shell: true,
    });
    return true;
  } catch (error) {
    console.error(`\n❌ Error running command: ${command}`);
    return false;
  }
}

function checkFile(filePath, description) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Warning: ${description} not found at ${filePath}`);
    return false;
  }
  console.log(`✅ Found: ${description}`);
  return true;
}

async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║      Tavia Database Setup Script                        ║');
  console.log('║      Shared Database for Frontoffice & Backoffice       ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Step 1: Check prerequisites
  console.log('📋 Step 1: Checking prerequisites...\n');

  const backofficeEnv = path.join(BACKOFFICE_DIR, '.env');
  const frontofficeEnv = path.join(FRONTOFFICE_DIR, '.env');

  checkFile(backofficeEnv, 'Backoffice .env');
  checkFile(frontofficeEnv, 'Frontoffice .env');
  checkFile(path.join(BACKOFFICE_DIR, 'prisma', 'schema.prisma'), 'Backoffice schema');
  checkFile(path.join(FRONTOFFICE_DIR, 'prisma', 'schema.prisma'), 'Frontoffice schema');

  // Step 2: Start Docker PostgreSQL
  console.log('\n📦 Step 2: Starting PostgreSQL Docker container...\n');
  if (!run('pnpm docker:up', BACKOFFICE_DIR)) {
    console.log('\n⚠️  Docker start failed. Make sure Docker Desktop is running.');
    console.log('   You can start it manually: cd apps/backoffice && pnpm docker:up\n');
  }

  // Wait for database to be ready
  console.log('\n⏳ Waiting 5 seconds for database to initialize...\n');
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Step 3: Generate Prisma clients
  console.log('\n🔨 Step 3: Generating Prisma clients...\n');

  console.log('Generating backoffice Prisma client...');
  if (!run('pnpm prisma generate', BACKOFFICE_DIR)) {
    console.error('\n❌ Failed to generate backoffice Prisma client');
    process.exit(1);
  }

  console.log('\nGenerating frontoffice Prisma client...');
  if (!run('pnpm prisma generate', FRONTOFFICE_DIR)) {
    console.error('\n❌ Failed to generate frontoffice Prisma client');
    process.exit(1);
  }

  // Step 4: Run migrations
  console.log('\n🗄️  Step 4: Running database migrations...\n');
  if (!run('pnpm db:migrate', BACKOFFICE_DIR)) {
    console.error('\n❌ Failed to run migrations');
    console.log('💡 Tip: If you see migration errors, try resetting:');
    console.log('   cd apps/backoffice && pnpm docker:clean && pnpm docker:up');
    process.exit(1);
  }

  // Step 5: Seed database
  console.log('\n🌱 Step 5: Seeding database with sample data...\n');
  if (!run('pnpm db:seed', BACKOFFICE_DIR)) {
    console.error('\n❌ Failed to seed database');
    process.exit(1);
  }

  // Success!
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║               ✅ Setup Complete! ✅                       ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  console.log('📊 Database Summary:');
  console.log('   • PostgreSQL running on localhost:5432');
  console.log('   • Database name: tavia');
  console.log('   • 6 restaurants seeded');
  console.log('   • 24 tables created');
  console.log('   • 3 users created');
  console.log('   • 2 sample bookings\n');

  console.log('👥 Test Users:');
  console.log('   • Admin:  admin@tavia.io / admin123');
  console.log('   • Owner:  owner@example.com / owner123');
  console.log('   • User:   user@example.com / user123\n');

  console.log('🚀 Next Steps:');
  console.log('   1. Start frontoffice: cd apps/frontoffice && pnpm dev');
  console.log('   2. Start backoffice: cd apps/backoffice && pnpm dev');
  console.log('   3. View data: cd apps/backoffice && pnpm db:studio\n');

  console.log('📚 Documentation: See DATABASE_SETUP.md for details\n');
}

main().catch((error) => {
  console.error('\n❌ Setup failed:', error);
  process.exit(1);
});
