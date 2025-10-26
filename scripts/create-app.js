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

const appsDir = path.join(__dirname, '..', 'apps');
const templatesDir = path.join(__dirname, '..', 'templates');
const appDir = path.join(appsDir, appName);
const templateDir = path.join(templatesDir, 'webapp');

// Check if template exists
if (!fs.existsSync(templateDir)) {
  console.error(`❌ Error: Template not found at templates/webapp`);
  console.log('Please ensure the webapp template exists in the templates directory.');
  process.exit(1);
}

// Check if app already exists
if (fs.existsSync(appDir)) {
  console.error(`❌ Error: App "${appName}" already exists at apps/${appName}`);
  process.exit(1);
}

console.log(`\n🚀 Creating new Next.js app: ${appName}\n`);

console.log('📋 Copying template from templates/webapp...');
execSync(`cp -r "${templateDir}" "${appDir}"`, { stdio: 'inherit' });

// Update package.json
console.log('📝 Updating package.json...');
const packageJsonPath = path.join(appDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

packageJson.name = `@tavia/${appName}`;
packageJson.version = '0.1.0';
packageJson.description = `${capitalize(appName)} web application for Tavia monorepo`;

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
    /container_name: webapp-postgres/g,
    `container_name: ${appName}-postgres`
  );
  dockerCompose = dockerCompose.replace(
    /POSTGRES_DB: \$\{POSTGRES_DB:-webapp\}/g,
    `POSTGRES_DB: \${POSTGRES_DB:-${appName}}`
  );
  dockerCompose = dockerCompose.replace(/webapp_postgres_data:/g, `${appName}_postgres_data:`);
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
    /DATABASE_URL="postgresql:\/\/postgres:postgres@localhost:5432\/webapp/g,
    `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/${appName}`
  );
  updatedEnv = updatedEnv.replace(/POSTGRES_DB=webapp/g, `POSTGRES_DB=${appName}`);
  fs.writeFileSync(envLocalPath, updatedEnv);
}
// Update README.md
console.log('📚 Updating README.md...');
const readmePath = path.join(appDir, 'README.md');
if (fs.existsSync(readmePath)) {
  let readme = fs.readFileSync(readmePath, 'utf-8');
  readme = readme.replace(
    /Generic Next.js 15 Webapp Template/g,
    `${capitalize(appName)} Web Application`
  );
  readme = readme.replace(/Webapp Template/g, `${capitalize(appName)} App`);
  readme = readme.replace(/webapp-template/g, appName);
  readme = readme.replace(/@tavia\/webapp-template/g, `@tavia/${appName}`);
  readme = readme.replace(/localhost:3000/g, `localhost:${newPort}`);
  fs.writeFileSync(readmePath, readme);
}

// Note: DOCKER.md and DATABASE.md are not included in the generic template
// Users should add Docker setup if needed

// Update next.config.js port reference if any
const nextConfigPath = path.join(appDir, 'next.config.ts');
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
  execSync('pnpm install', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
} catch {
  console.log('⚠️  Dependencies installation had warnings (this is normal)');
}

console.log('\n✅ App created successfully!\n');
console.log(`📁 Location: apps/${appName}`);
console.log(`🌐 Dev URL: http://localhost:${newPort}`);
console.log(`🗄️  Database: ${appName} (PostgreSQL)`);
console.log('\n🚀 Next steps:');
console.log(`   1. cd apps/${appName}`);
console.log(`   2. Update .env.local with your database configuration`);
console.log(`   3. Add your Prisma models in prisma/schema.prisma`);
console.log(`   4. Generate Prisma client: pnpm db:generate`);
console.log(`   5. Push database schema: pnpm db:push`);
console.log(`   6. Start dev server: pnpm dev`);
console.log('\n📚 See README.md for more information');
console.log('\n✨ Features included:');
console.log('   ✅ Next.js 15 + React 19 + TypeScript');
console.log('   ✅ next-intl for internationalization (en, vi) with modular structure');
console.log('   ✅ Prisma ORM (PostgreSQL ready with Docker)');
console.log('   ✅ @tavia/core UI components with Emotion styling');
console.log('   ✅ @tavia/analytics SDK integrated');
console.log('   ✅ Vitest + Testing Library with React 19 support');
console.log('   ✅ ClientProviders and AnalyticsProvider setup');
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
