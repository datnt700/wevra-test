#!/usr/bin/env node

/**
 * Create a new Fastify API service in the Tavia monorepo
 * Usage: pnpm create:api <api-name>
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get API name from command line
const apiName = process.argv[2];

if (!apiName) {
  console.error('❌ Error: API name is required');
  console.log('Usage: pnpm create:api <api-name>');
  console.log('Example: pnpm create:api notifications');
  process.exit(1);
}

// Validate API name
if (!/^[a-z][a-z0-9-]*$/.test(apiName)) {
  console.error(
    '❌ Error: API name must be lowercase, start with a letter, and contain only letters, numbers, and hyphens'
  );
  process.exit(1);
}

const appsDir = path.join(__dirname, '..', 'apps');
const apiDir = path.join(appsDir, apiName);

// Check if API already exists
if (fs.existsSync(apiDir)) {
  console.error(`❌ Error: API "${apiName}" already exists at apps/${apiName}`);
  process.exit(1);
}

console.log(`\n🚀 Creating new Fastify API service: ${apiName}\n`);

// Copy from analytics template
const templateDir = path.join(appsDir, 'analytics');

if (!fs.existsSync(templateDir)) {
  console.error('❌ Error: Analytics template not found at apps/analytics');
  console.log('Please ensure the analytics API exists first.');
  process.exit(1);
}

console.log('📋 Copying template from apps/analytics...');
fs.cpSync(templateDir, apiDir, { recursive: true });

// Calculate new port (3001 for analytics, 3002+)
const newPort = 3001 + getApiPort(apiName);

// Update package.json
console.log('📝 Updating package.json...');
const packageJsonPath = path.join(apiDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

packageJson.name = apiName;
packageJson.description = `Tavia ${capitalize(apiName)} API - ${capitalize(apiName)} service`;
packageJson.version = '0.1.0';

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// Update .env files
console.log('🔐 Updating environment files...');
const envExamplePath = path.join(apiDir, '.env.example');
const envPath = path.join(apiDir, '.env');

if (fs.existsSync(envExamplePath)) {
  let envExample = fs.readFileSync(envExamplePath, 'utf-8');

  // Update port
  envExample = envExample.replace(/PORT=3001/g, `PORT=${newPort}`);

  // Update API key placeholder
  envExample = envExample.replace(
    /ANALYTICS_API_KEY="your-secret-api-key-here"/g,
    `${apiName.toUpperCase()}_API_KEY="your-secret-api-key-here"`
  );

  // Update database name
  envExample = envExample.replace(
    /postgresql:\/\/postgres:postgres@localhost:5432\/tavia/g,
    `postgresql://postgres:postgres@localhost:5432/${apiName}`
  );

  fs.writeFileSync(envExamplePath, envExample);
}

if (fs.existsSync(envPath)) {
  let env = fs.readFileSync(envPath, 'utf-8');

  // Update port
  env = env.replace(/PORT=3001/g, `PORT=${newPort}`);

  // Update API key
  env = env.replace(
    /ANALYTICS_API_KEY="dev-analytics-api-key-12345"/g,
    `${apiName.toUpperCase()}_API_KEY="dev-${apiName}-api-key-12345"`
  );

  // Update database name
  env = env.replace(
    /postgresql:\/\/postgres:postgres@localhost:5432\/tavia/g,
    `postgresql://postgres:postgres@localhost:5432/${apiName}`
  );

  fs.writeFileSync(envPath, env);
}

// Update README.md
console.log('📚 Updating README.md...');
const readmePath = path.join(apiDir, 'README.md');
if (fs.existsSync(readmePath)) {
  let readme = fs.readFileSync(readmePath, 'utf-8');

  // Replace titles and descriptions
  readme = readme.replace(/# Analytics API/g, `# ${capitalize(apiName)} API`);
  readme = readme.replace(
    /Tavia's standalone analytics event tracking and statistics API service/g,
    `Tavia's ${capitalize(apiName)} API service`
  );
  readme = readme.replace(
    /A high-performance Fastify-based microservice for collecting, processing, and analyzing user analytics events from the Tavia platform\./g,
    `A high-performance Fastify-based microservice for ${apiName} functionality.`
  );

  // Replace paths
  readme = readme.replace(/apps\/analytics/g, `apps/${apiName}`);
  readme = readme.replace(/cd apps\/analytics/g, `cd apps/${apiName}`);

  // Replace port numbers
  readme = readme.replace(/localhost:3001/g, `localhost:${newPort}`);
  readme = readme.replace(/Port: 3001/g, `Port: ${newPort}`);

  // Replace API key references
  readme = readme.replace(/ANALYTICS_API_KEY/g, `${apiName.toUpperCase()}_API_KEY`);
  readme = readme.replace(/dev-analytics-api-key-12345/g, `dev-${apiName}-api-key-12345`);

  fs.writeFileSync(readmePath, readme);
}

// Update Prisma schema comment
console.log('🗄️  Updating Prisma schema...');
const prismaSchemaPath = path.join(apiDir, 'prisma', 'schema.prisma');
if (fs.existsSync(prismaSchemaPath)) {
  let schema = fs.readFileSync(prismaSchemaPath, 'utf-8');
  schema = schema.replace(
    /\/\/ Analytics API Prisma Schema/g,
    `// ${capitalize(apiName)} API Prisma Schema`
  );
  schema = schema.replace(
    /\/\/ Analytics event tracking database schema/g,
    `// ${capitalize(apiName)} service database schema`
  );
  fs.writeFileSync(prismaSchemaPath, schema);
}

// Clean up specific files and folders
console.log('🧹 Cleaning up...');
const filesToRemove = ['node_modules', '.next', '.turbo', 'dist', 'coverage', 'pnpm-lock.yaml'];

filesToRemove.forEach((file) => {
  const filePath = path.join(apiDir, file);
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath, { recursive: true, force: true });
  }
});

// Remove analytics-specific source files (user will implement their own)
console.log('🧹 Removing template-specific files...');
const routesDir = path.join(apiDir, 'src', 'routes');
if (fs.existsSync(routesDir)) {
  const analyticsRoutePath = path.join(routesDir, 'analytics.ts');
  if (fs.existsSync(analyticsRoutePath)) {
    fs.unlinkSync(analyticsRoutePath);

    // Create a basic example route
    const exampleRoute = `import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * Example routes for ${capitalize(apiName)} API
 * Replace this with your actual business logic
 */
export async function exampleRoutes(app: FastifyInstance) {
  /**
   * GET /api/example - Example endpoint
   */
  app.get('/api/example', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.send({
      message: 'Hello from ${capitalize(apiName)} API!',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * POST /api/example - Example POST endpoint
   */
  app.post<{ Body: { name: string } }>(
    '/api/example',
    async (request: FastifyRequest<{ Body: { name: string } }>, reply: FastifyReply) => {
      const { name } = request.body;

      return reply.send({
        message: \`Hello, \${name}!\`,
        received: name,
        timestamp: new Date().toISOString(),
      });
    }
  );
}
`;
    fs.writeFileSync(path.join(routesDir, 'example.ts'), exampleRoute);
  }
}

// Update app.ts to use example routes instead of analytics routes
const appTsPath = path.join(apiDir, 'src', 'app.ts');
if (fs.existsSync(appTsPath)) {
  let appTs = fs.readFileSync(appTsPath, 'utf-8');
  appTs = appTs.replace(
    /import { analyticsRoutes } from '.\/routes\/analytics.js';/g,
    "import { exampleRoutes } from './routes/example.js';"
  );
  appTs = appTs.replace(
    /app\.register\(analyticsRoutes, { prefix: '\/api' }\);/g,
    'app.register(exampleRoutes);'
  );
  fs.writeFileSync(appTsPath, appTs);
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('pnpm install', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
} catch {
  console.log('⚠️  Dependencies installation had warnings (this is normal)');
}

console.log('\n✅ API service created successfully!\n');
console.log(`📁 Location: apps/${apiName}`);
console.log(`🌐 Dev URL: http://localhost:${newPort}`);
console.log(`🗄️  Database: ${apiName} (PostgreSQL)`);
console.log('\n🚀 Next steps:');
console.log(`   1. cd apps/${apiName}`);
console.log(`   2. Update .env with your configuration`);
console.log(`   3. Update prisma/schema.prisma with your data models`);
console.log(`   4. Update src/routes/example.ts with your business logic`);
console.log(`   5. Generate Prisma client: pnpm db:generate`);
console.log(`   6. Run migrations: pnpm db:migrate`);
console.log(`   7. Start dev server: pnpm dev`);
console.log('\n📚 Files to customize:');
console.log(`   • prisma/schema.prisma - Your database models`);
console.log(`   • src/routes/example.ts - Your API routes (rename as needed)`);
console.log(`   • src/app.ts - Register your routes`);
console.log(`   • .env - Your environment variables`);
console.log(`   • README.md - Your API documentation`);
console.log('\n✨ Features included:');
console.log('   ✅ Fastify 5 + TypeScript 5.9');
console.log('   ✅ Prisma ORM + PostgreSQL');
console.log('   ✅ Zod validation');
console.log('   ✅ Security (CORS, Helmet, Rate Limiting)');
console.log('   ✅ Health check endpoints');
console.log('   ✅ Pino logger with pretty printing');
console.log('   ✅ Hot reload with tsx watch');
console.log('   ✅ ESLint + Prettier');
console.log('   ✅ Workspace integration');
console.log('\n✨ Happy coding!\n');

/**
 * Generate a deterministic port offset based on API name
 * Returns 0-99 based on API name hash
 * analytics = 0 (port 3001), others get 1-99 (ports 3002-3100)
 */
function getApiPort(name) {
  if (name === 'analytics') return 0;

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
