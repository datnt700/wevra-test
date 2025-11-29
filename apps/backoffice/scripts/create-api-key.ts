#!/usr/bin/env tsx
/**
 * API Key Generation Script
 * Usage: pnpm db:create-api-key <user-email> <key-name> [rate-limit] [expires-days]
 */

import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function generateApiKey(
  email: string,
  keyName: string,
  rateLimit: number = 1000,
  expiresDays?: number
) {
  try {
    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.error(`❌ User with email "${email}" not found`);
      process.exit(1);
    }

    // Generate random API key (32 bytes = 64 hex characters)
    const rawKey = crypto.randomBytes(32).toString('hex');
    const prefix = rawKey.substring(0, 8); // First 8 characters as prefix
    const fullKey = `tav_${rawKey}`; // Full key with prefix

    // Hash the key for storage
    const keyHash = await bcrypt.hash(fullKey, 10);

    // Calculate expiration date
    const expiresAt = expiresDays ? new Date(Date.now() + expiresDays * 24 * 60 * 60 * 1000) : null;

    // Create API key record
    const apiKey = await prisma.apiKey.create({
      data: {
        userId: user.id,
        name: keyName,
        keyHash,
        keyPrefix: prefix,
        rateLimit,
        expiresAt,
        status: 'ACTIVE',
      },
    });

    console.log('\n✅ API Key created successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`👤 User:       ${user.email}`);
    console.log(`🔑 Key Name:   ${keyName}`);
    console.log(`🆔 Key ID:     ${apiKey.id}`);
    console.log(`📊 Rate Limit: ${rateLimit} requests/hour`);
    console.log(`⏰ Expires:    ${expiresAt ? expiresAt.toISOString() : 'Never'}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log("🔐 API Key (save this securely, it won't be shown again):");
    console.log(`\n   ${fullKey}\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log("⚠️  Store this key securely. You won't be able to see it again!");
    console.log('📝 Usage: Add header "X-API-Key: <your-key>" to requests\n');

    return apiKey;
  } catch (error) {
    console.error('❌ Error creating API key:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Parse command line arguments
const [email, keyName, rateLimit, expiresDays] = process.argv.slice(2);

if (!email || !keyName) {
  console.error(
    '\n❌ Usage: pnpm db:create-api-key <user-email> <key-name> [rate-limit] [expires-days]\n'
  );
  console.error('Examples:');
  console.error('  pnpm db:create-api-key john@example.com "Production API" 5000 365');
  console.error('  pnpm db:create-api-key jane@example.com "Dev API" 1000\n');
  process.exit(1);
}

generateApiKey(
  email,
  keyName,
  rateLimit ? parseInt(rateLimit) : 1000,
  expiresDays ? parseInt(expiresDays) : undefined
);
