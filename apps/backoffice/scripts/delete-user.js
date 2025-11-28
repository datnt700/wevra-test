#!/usr/bin/env node
/**
 * Delete User Script
 * Removes a user and all associated data from the database
 *
 * Usage:
 *   node scripts/delete-user.js
 *   node scripts/delete-user.js user@example.com
 */

import { PrismaClient } from '@prisma/client';
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

async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      accounts: true,
      sessions: true,
    },
  });
}

async function findUserBySearch(search) {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ],
    },
    take: 10,
    include: {
      accounts: true,
    },
  });
  return users;
}

async function deleteUser(userId) {
  console.log('\n🗑️  Deleting user and associated data...\n');

  // Delete in correct order (foreign key constraints)
  const deleted = await prisma.$transaction(async (tx) => {
    // Delete sessions
    const sessions = await tx.session.deleteMany({
      where: { userId },
    });
    console.log(`   ✓ Deleted ${sessions.count} session(s)`);

    // Delete accounts (OAuth links)
    const accounts = await tx.account.deleteMany({
      where: { userId },
    });
    console.log(`   ✓ Deleted ${accounts.count} OAuth account(s)`);

    // Delete user
    const user = await tx.user.delete({
      where: { id: userId },
    });
    console.log(`   ✓ Deleted user: ${user.email}`);

    return { user, sessions: sessions.count, accounts: accounts.count };
  });

  return deleted;
}

async function main() {
  console.log('🗑️  User Deletion Script\n');
  console.log('This will permanently delete a user and all associated data.');
  console.log('Use with caution!\n');

  try {
    // Check if email provided as argument
    const emailArg = process.argv[2];
    let user;

    if (emailArg) {
      console.log(`Searching for user: ${emailArg}\n`);
      user = await findUserByEmail(emailArg);

      if (!user) {
        console.log('❌ User not found!\n');
        const answer = await question('Do you want to search by partial email/name? (y/n): ');
        if (answer.toLowerCase() !== 'y') {
          process.exit(0);
        }
      }
    }

    // Interactive search
    if (!user) {
      const search = await question('\nEnter email or name to search: ');

      if (!search.trim()) {
        console.log('❌ Search query cannot be empty');
        process.exit(1);
      }

      const users = await findUserBySearch(search.trim());

      if (users.length === 0) {
        console.log('❌ No users found matching your search');
        process.exit(0);
      }

      console.log(`\n📋 Found ${users.length} user(s):\n`);
      users.forEach((u, index) => {
        const oauthProviders = u.accounts.map((a) => a.provider).join(', ') || 'None';
        console.log(
          `${index + 1}. ${u.email} (${u.name || 'No name'}) - Role: ${u.role} - OAuth: ${oauthProviders}`
        );
      });

      const selection = await question('\nSelect user number (or 0 to cancel): ');
      const selectedIndex = parseInt(selection) - 1;

      if (selectedIndex < 0 || selectedIndex >= users.length) {
        console.log('❌ Cancelled or invalid selection');
        process.exit(0);
      }

      user = users[selectedIndex];
    }

    // Display user details
    console.log('\n👤 User Details:');
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name || 'N/A'}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   ID: ${user.id}`);
    console.log(`   OAuth Accounts: ${user.accounts.length}`);
    if (user.accounts.length > 0) {
      user.accounts.forEach((account) => {
        console.log(`      - ${account.provider} (${account.providerAccountId})`);
      });
    }
    console.log(`   Sessions: ${user.sessions?.length || 0}`);

    // Confirm deletion
    const confirm = await question('\n⚠️  Are you sure you want to DELETE this user? (yes/no): ');

    if (confirm.toLowerCase() !== 'yes') {
      console.log('❌ Deletion cancelled');
      process.exit(0);
    }

    // Double confirm
    const doubleConfirm = await question(`Type the email "${user.email}" to confirm: `);

    if (doubleConfirm !== user.email) {
      console.log('❌ Email does not match. Deletion cancelled');
      process.exit(0);
    }

    // Delete user
    const result = await deleteUser(user.id);

    console.log('\n✅ User successfully deleted!\n');
    console.log('Summary:');
    console.log(`   User: ${result.user.email}`);
    console.log(`   Sessions deleted: ${result.sessions}`);
    console.log(`   OAuth accounts deleted: ${result.accounts}`);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

main();
