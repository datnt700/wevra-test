#!/usr/bin/env node

/**
 * Create a new Next.js webapp in the Tavia monorepo
 * Usage: pnpm create:app <app-name>
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get app name from command line
const appName = process.argv[2];

if (!appName) {
  console.error('❌ Error: App name is required');
  console.log('Usage: pnpm create:app <app-name>');
  console.log('Example: pnpm create:app admin');
  process.exit(1);
}

// Validate app name
if (!/^[a-z][a-z0-9-]*$/.test(appName)) {
  console.error(
    '❌ Error: App name must be lowercase, start with a letter, and contain only letters, numbers, and hyphens'
  );
  process.exit(1);
}

const appsDir = path.join(__dirname, 'apps');
const appDir = path.join(appsDir, appName);

// Check if app already exists
if (fs.existsSync(appDir)) {
  console.error(`❌ Error: App "${appName}" already exists at apps/${appName}`);
  process.exit(1);
}

console.log(`\n🚀 Creating new Next.js app: ${appName}\n`);

// Copy from web template
const templateDir = path.join(appsDir, 'web');

console.log('📋 Copying template from apps/web...');
execSync(`cp -r "${templateDir}" "${appDir}"`, { stdio: 'inherit' });

// Update package.json
console.log('📝 Updating package.json...');
const packageJsonPath = path.join(appDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

packageJson.name = appName;
packageJson.version = '0.1.0';

// Update dev script with new port
const newPort = 3000 + getAppPort(appName);
packageJson.scripts.dev = `next dev --turbopack --port ${newPort}`;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// Update docker-compose.yml with new container name and database
console.log('🐳 Updating docker-compose.yml...');
const dockerComposePath = path.join(appDir, 'docker-compose.yml');
if (fs.existsSync(dockerComposePath)) {
  let dockerCompose = fs.readFileSync(dockerComposePath, 'utf-8');
  dockerCompose = dockerCompose.replace(
    /container_name: tavia-postgres/g,
    `container_name: ${appName}-postgres`
  );
  dockerCompose = dockerCompose.replace(
    /POSTGRES_DB: \$\{POSTGRES_DB:-tavia\}/g,
    `POSTGRES_DB: \${POSTGRES_DB:-${appName}}`
  );
  dockerCompose = dockerCompose.replace(/postgres_data:/g, `${appName}_postgres_data:`);
  fs.writeFileSync(dockerComposePath, dockerCompose);
}

// Create .env.local from .env.example
console.log('🔐 Creating .env.local...');
const envExamplePath = path.join(appDir, '.env.example');
const envLocalPath = path.join(appDir, '.env.local');

if (fs.existsSync(envExamplePath)) {
  const envExample = fs.readFileSync(envExamplePath, 'utf-8');
  let updatedEnv = envExample.replace(
    /NEXT_PUBLIC_APP_URL=.*/,
    `NEXT_PUBLIC_APP_URL=http://localhost:${newPort}`
  );
  updatedEnv = updatedEnv.replace(/NEXTAUTH_URL=.*/, `NEXTAUTH_URL=http://localhost:${newPort}`);
  updatedEnv = updatedEnv.replace(
    /DATABASE_URL="postgresql:\/\/postgres:postgres@localhost:5432\/tavia/g,
    `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/${appName}`
  );
  updatedEnv = updatedEnv.replace(/POSTGRES_DB=tavia/g, `POSTGRES_DB=${appName}`);
  fs.writeFileSync(envLocalPath, updatedEnv);
}

// Update README.md
console.log('📚 Updating README.md...');
const readmePath = path.join(appDir, 'README.md');
if (fs.existsSync(readmePath)) {
  let readme = fs.readFileSync(readmePath, 'utf-8');
  readme = readme.replace(/# Tavia Web App/g, `# ${capitalize(appName)} App`);
  readme = readme.replace(/# Web App/g, `# ${capitalize(appName)} App`);
  readme = readme.replace(/web@/g, `${appName}@`);
  readme = readme.replace(/localhost:3000/g, `localhost:${newPort}`);
  fs.writeFileSync(readmePath, readme);
}

// Update DOCKER.md
console.log('🐳 Updating DOCKER.md...');
const dockerMdPath = path.join(appDir, 'DOCKER.md');
if (fs.existsSync(dockerMdPath)) {
  let dockerMd = fs.readFileSync(dockerMdPath, 'utf-8');
  dockerMd = dockerMd.replace(/tavia-postgres/g, `${appName}-postgres`);
  dockerMd = dockerMd.replace(
    /postgresql:\/\/postgres:postgres@localhost:5432\/tavia/g,
    `postgresql://postgres:postgres@localhost:5432/${appName}`
  );
  dockerMd = dockerMd.replace(/POSTGRES_DB=tavia/g, `POSTGRES_DB=${appName}`);
  dockerMd = dockerMd.replace(/-d tavia/g, `-d ${appName}`);
  dockerMd = dockerMd.replace(/-U postgres tavia/g, `-U postgres ${appName}`);
  fs.writeFileSync(dockerMdPath, dockerMd);
}

// Update DATABASE.md
console.log('📊 Updating DATABASE.md...');
const databaseMdPath = path.join(appDir, 'DATABASE.md');
if (fs.existsSync(databaseMdPath)) {
  let databaseMd = fs.readFileSync(databaseMdPath, 'utf-8');
  databaseMd = databaseMd.replace(
    /postgresql:\/\/postgres:postgres@localhost:5432\/tavia/g,
    `postgresql://postgres:postgres@localhost:5432/${appName}`
  );
  databaseMd = databaseMd.replace(/CREATE DATABASE tavia/g, `CREATE DATABASE ${appName}`);
  databaseMd = databaseMd.replace(/POSTGRES_DB=tavia/g, `POSTGRES_DB=${appName}`);
  fs.writeFileSync(databaseMdPath, databaseMd);
}

// Update next.config.js port reference if any
const nextConfigPath = path.join(appDir, 'next.config.js');
if (fs.existsSync(nextConfigPath)) {
  let nextConfig = fs.readFileSync(nextConfigPath, 'utf-8');
  nextConfig = nextConfig.replace(/port: 3000/g, `port: ${newPort}`);
  fs.writeFileSync(nextConfigPath, nextConfig);
}

// Clean up specific files
console.log('🧹 Cleaning up...');
const filesToRemove = ['node_modules', '.next', '.turbo', 'pnpm-lock.yaml'];

filesToRemove.forEach((file) => {
  const filePath = path.join(appDir, file);
  if (fs.existsSync(filePath)) {
    execSync(`rm -rf "${filePath}"`, { stdio: 'inherit' });
  }
});

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('pnpm install', { cwd: path.join(__dirname), stdio: 'inherit' });
} catch {
  console.log('⚠️  Dependencies installation had warnings (this is normal)');
}

console.log('\n✅ App created successfully!\n');
console.log(`📁 Location: apps/${appName}`);
console.log(`🌐 Dev URL: http://localhost:${newPort}`);
console.log(`🗄️  Database: ${appName} (PostgreSQL)`);
console.log(`🐳 Docker Container: ${appName}-postgres`);
console.log('\n🚀 Next steps:');
console.log(`   1. cd apps/${appName}`);
console.log(`   2. Update .env.local with your configuration`);
console.log(`   3. Start PostgreSQL: pnpm docker:up`);
console.log(`   4. Run migrations: pnpm db:migrate`);
console.log(`   5. Seed database: pnpm db:seed`);
console.log(`   6. Start dev server: pnpm dev`);
console.log('\n   Or run setup all at once: pnpm db:setup && pnpm dev');
console.log('\n📚 Documentation:');
console.log(`   • DOCKER.md - PostgreSQL Docker setup`);
console.log(`   • DATABASE.md - Database & Auth.js guide`);
console.log('\n✨ Features included:');
console.log('   ✅ Next.js 15 + React 19 + TypeScript');
console.log('   ✅ next-intl for internationalization');
console.log('   ✅ Prisma ORM + PostgreSQL');
console.log('   ✅ Auth.js v5 (Credentials + OAuth)');
console.log('   ✅ @tavia/analytics SDK');
console.log('   ✅ @tavia/core UI components');
console.log('   ✅ Emotion + Framer Motion');
console.log('   ✅ Docker PostgreSQL container');
console.log('   ✅ Vitest + Testing Library');
console.log('   ✅ Playwright E2E tests');
console.log('\n✨ Happy coding!\n');

/**
 * Generate a deterministic port offset based on app name
 * Returns 0-99 based on app name hash
 */
function getAppPort(name) {
  if (name === 'web') return 0;

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Return a number between 1 and 99
  return Math.abs(hash % 99) + 1;
}

/**
 * Capitalize first letter
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
