#!/usr/bin/env node
/**
 * Create User Script
 * Creates a new user with credentials in the database
 *
 * Usage:
 *   pnpm db:create-user
 *   node scripts/create-user.js
 */

import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

const ROLES = ['ADMIN', 'ORGANIZER', 'ATTENDEE', 'MODERATOR'];
const ENVIRONMENTS = ['development', 'staging', 'production'];

async function checkUserExists(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

async function createUser(userData) {
  console.log('\n👤 Creating user...\n');

  // Hash password
  const hashedPassword = await bcryptjs.hash(userData.password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email: userData.email,
      name: userData.name || null,
      password: hashedPassword,
      role: userData.role,
      emailVerified: new Date(), // Auto-verify for script-created users
    },
  });

  return user;
}

async function main() {
  console.log('👤 User Creation Script\n');
  console.log('This will create a new user with credentials.\n');

  try {
    // 1. Select environment
    console.log('📦 Available environments:');
    ENVIRONMENTS.forEach((env, index) => {
      console.log(`   ${index + 1}. ${env}`);
    });

    const envSelection = await question('\nSelect environment (1-3): ');
    const envIndex = parseInt(envSelection) - 1;

    if (envIndex < 0 || envIndex >= ENVIRONMENTS.length) {
      console.log('❌ Invalid environment selection');
      process.exit(1);
    }

    const selectedEnv = ENVIRONMENTS[envIndex];
    console.log(`✅ Selected environment: ${selectedEnv}\n`);

    // Warning for production
    if (selectedEnv === 'production') {
      const confirmProd = await question(
        '⚠️  WARNING: You are creating a user in PRODUCTION. Continue? (yes/no): '
      );
      if (confirmProd.toLowerCase() !== 'yes') {
        console.log('❌ Cancelled');
        process.exit(0);
      }
    }

    // 2. Get email
    const email = await question('📧 Enter email: ');
    if (!email.trim() || !email.includes('@')) {
      console.log('❌ Invalid email address');
      process.exit(1);
    }

    // Check if user exists
    const existingUser = await checkUserExists(email.trim());
    if (existingUser) {
      console.log(`❌ User with email "${email}" already exists!`);
      console.log(`   Name: ${existingUser.name || 'N/A'}`);
      console.log(`   Role: ${existingUser.role}`);
      process.exit(1);
    }

    // 3. Get name (optional)
    const name = await question('👤 Enter name (optional, press Enter to skip): ');

    // 4. Get password
    const password = await question('🔒 Enter password (min 8 characters): ');
    if (!password || password.length < 8) {
      console.log('❌ Password must be at least 8 characters');
      process.exit(1);
    }

    const confirmPassword = await question('🔒 Confirm password: ');
    if (password !== confirmPassword) {
      console.log('❌ Passwords do not match');
      process.exit(1);
    }

    // 5. Select role
    console.log('\n👔 Available roles:');
    ROLES.forEach((role, index) => {
      const description = {
        ADMIN: 'Full system access',
        ORGANIZER: 'Can create and manage groups/events',
        MODERATOR: 'Can moderate groups and members',
        ATTENDEE: 'Can join groups and attend events',
      };
      console.log(`   ${index + 1}. ${role} - ${description[role]}`);
    });

    const roleSelection = await question('\nSelect role (1-4): ');
    const roleIndex = parseInt(roleSelection) - 1;

    if (roleIndex < 0 || roleIndex >= ROLES.length) {
      console.log('❌ Invalid role selection');
      process.exit(1);
    }

    const selectedRole = ROLES[roleIndex];

    // 6. Confirm details
    console.log('\n📋 User Details:');
    console.log(`   Environment: ${selectedEnv}`);
    console.log(`   Email: ${email.trim()}`);
    console.log(`   Name: ${name.trim() || 'N/A'}`);
    console.log(`   Role: ${selectedRole}`);
    console.log(`   Email Verified: Yes (auto-verified)`);

    const confirm = await question('\n✅ Create user with these details? (yes/no): ');
    if (confirm.toLowerCase() !== 'yes') {
      console.log('❌ Cancelled');
      process.exit(0);
    }

    // 7. Create user
    const user = await createUser({
      email: email.trim(),
      name: name.trim() || null,
      password,
      role: selectedRole,
    });

    console.log('\n✅ User successfully created!\n');
    console.log('User Details:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name || 'N/A'}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Created: ${user.createdAt}`);
    console.log(`   Email Verified: ${user.emailVerified ? 'Yes' : 'No'}`);
    console.log('\n💡 The user can now login with their email and password.');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.code === 'P2002') {
      console.error('   This email is already registered.');
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

main();
