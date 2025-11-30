#!/usr/bin/env node

/**
 * Create a new API service in the Eventure monorepo
 * Supports both simple Fastify APIs and complex NestJS microservices
 * Usage: pnpm create:api [api-name]
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create readline interface for prompts
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Promisify question
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// Get API name from command line (optional)
let apiName = process.argv[2];
let _apiType = null;

// Main function to handle interactive prompts
async function main() {
  console.log('\n🚀 Eventure API Generator\n');

  // Step 1: Get API name
  if (!apiName) {
    apiName = await question('? What name would you like to use for the API? ');
  }

  if (!apiName) {
    console.error('\n❌ Error: API name is required');
    rl.close();
    process.exit(1);
  }

  // Validate API name
  if (!/^[a-z][a-z0-9-]*$/.test(apiName)) {
    console.error(
      '\n❌ Error: API name must be lowercase, start with a letter, and contain only letters, numbers, and hyphens'
    );
    rl.close();
    process.exit(1);
  }

  const appsDir = path.join(__dirname, '..', 'apps');
  const templatesDir = path.join(__dirname, '..', 'templates');
  const apiDir = path.join(appsDir, apiName);

  // Check if API already exists
  if (fs.existsSync(apiDir)) {
    console.error(`\n❌ Error: API "${apiName}" already exists at apps/${apiName}`);
    rl.close();
    process.exit(1);
  }

  // Step 2: Choose API type
  console.log('\n? Which type of API would you like to create?');
  console.log('  1) Simple API (Fastify - Lightweight, fast, simple REST API)');
  console.log('  2) Complex API (NestJS - Full-featured microservice with advanced features)');

  const typeChoice = await question('\nEnter your choice (1 or 2): ');

  if (typeChoice === '1') {
    apiType = 'fastify';
    await createFastifyAPI(apiName, apiDir, templatesDir);
  } else if (typeChoice === '2') {
    apiType = 'nestjs';
    await createNestJSAPI(apiName, apiDir, templatesDir);
  } else {
    console.error('\n❌ Invalid choice. Please select 1 or 2.');
    rl.close();
    process.exit(1);
  }

  rl.close();
}

/**
 * Create a simple Fastify API
 */
async function createFastifyAPI(apiName, apiDir, templatesDir) {
  console.log(`\n🚀 Creating new Fastify API service: ${apiName}\n`);

  // Copy from simple-api template
  const templateDir = path.join(templatesDir, 'simple-api');

  if (!fs.existsSync(templateDir)) {
    console.error('❌ Error: Simple API template not found at templates/simple-api');
    console.log('Please ensure the simple-api template exists.');
    process.exit(1);
  }

  console.log('📋 Copying template from templates/simple-api...');
  fs.cpSync(templateDir, apiDir, { recursive: true });

  // Calculate new port (3001 for analytics, 3002+)
  const newPort = 3001 + getApiPort(apiName);

  // Update package.json
  console.log('📝 Updating package.json...');
  const packageJsonPath = path.join(apiDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  packageJson.name = apiName;
  packageJson.description = `Eventure ${capitalize(apiName)} API - ${capitalize(apiName)} service`;
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
      /postgresql:\/\/postgres:postgres@localhost:5432\/eventure/g,
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
      /postgresql:\/\/postgres:postgres@localhost:5432\/eventure/g,
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
    readme = readme.replace(/Generic Fastify 5 API Template/g, `${capitalize(apiName)} API`);
    readme = readme.replace(/Simple API Template/g, `${capitalize(apiName)} API`);
    readme = readme.replace(
      /Generic Fastify 5 API template for Eventure monorepo/g,
      `${capitalize(apiName)} API service for Eventure monorepo`
    );
    readme = readme.replace(/@eventure\/simple-api-template/g, `@eventure/${apiName}`);
    readme = readme.replace(/simple-api-template/g, apiName);
    readme = readme.replace(/localhost:4000/g, `localhost:${newPort}`);

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
}

/**
 * Create a complex NestJS microservice
 */
async function createNestJSAPI(apiName, apiDir, _templatesDir) {
  console.log(`\n🚀 Creating new NestJS microservice: ${apiName}\n`);

  // Ask for transport layer
  console.log('? What transport layer do you use?');
  console.log('  1) REST API (HTTP endpoints with Swagger docs)');
  console.log('  2) GraphQL - code first');
  console.log('  3) GraphQL - schema first');
  console.log('  4) Microservice - non-HTTP (TCP, Redis, NATS, gRPC, etc.)');
  console.log('  5) WebSockets');

  const transportChoice = await question('\nEnter your choice (1-5): ');

  let transportType = 'rest';
  switch (transportChoice) {
    case '1':
      transportType = 'rest';
      break;
    case '2':
      transportType = 'graphql-code-first';
      break;
    case '3':
      transportType = 'graphql-schema-first';
      break;
    case '4':
      transportType = 'microservice';
      break;
    case '5':
      transportType = 'ws';
      break;
    default:
      console.log('⚠️  Invalid choice, defaulting to REST API');
      transportType = 'rest';
  }

  // Calculate new port
  const newPort = 3001 + getApiPort(apiName);

  console.log('\n📦 Generating NestJS project with CLI...');

  try {
    // Generate NestJS project
    execSync(`npx @nestjs/cli new ${apiName} --package-manager pnpm --skip-git`, {
      cwd: appsDir,
      stdio: 'inherit',
    });

    console.log('\n✅ NestJS project generated successfully!');

    // Install additional dependencies based on transport type
    console.log('\n📦 Installing additional dependencies...');

    const dependencies = ['@nestjs/config', 'dotenv'];
    const devDependencies = [];

    if (transportType === 'rest' || transportType === 'microservice') {
      dependencies.push(
        '@nestjs/swagger',
        '@prisma/client',
        'class-validator',
        'class-transformer',
        'helmet',
        'compression'
      );
      devDependencies.push('prisma');
    }

    if (transportType.startsWith('graphql')) {
      dependencies.push('@nestjs/graphql', '@nestjs/apollo', '@apollo/server', 'graphql');
    }

    if (transportType === 'microservice') {
      dependencies.push('@nestjs/microservices');
    }

    if (transportType === 'ws') {
      dependencies.push('@nestjs/websockets', '@nestjs/platform-socket.io');
    }

    // Install dependencies
    if (dependencies.length > 0) {
      execSync(`pnpm add ${dependencies.join(' ')}`, {
        cwd: apiDir,
        stdio: 'inherit',
      });
    }

    if (devDependencies.length > 0) {
      execSync(`pnpm add -D ${devDependencies.join(' ')}`, {
        cwd: apiDir,
        stdio: 'inherit',
      });
    }

    // Create .env and .env.example files
    console.log('\n🔐 Creating environment files...');

    const envContent = `# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/${apiName}"

# Server
PORT=${newPort}
NODE_ENV=development
API_PREFIX=api/v1

# Swagger (for REST APIs)
SWAGGER_TITLE="${capitalize(apiName)} Service API"
SWAGGER_DESCRIPTION="API for ${apiName} service"
SWAGGER_VERSION="1.0"
`;

    fs.writeFileSync(path.join(apiDir, '.env'), envContent);
    fs.writeFileSync(path.join(apiDir, '.env.example'), envContent);

    // Initialize Prisma if REST or microservice
    if (transportType === 'rest' || transportType === 'microservice') {
      console.log('\n🗄️  Initializing Prisma...');
      try {
        execSync('npx prisma init', { cwd: apiDir, stdio: 'inherit' });
      } catch {
        console.log('⚠️  Prisma init had warnings (this is normal)');
      }

      // Create prisma.config.ts
      const prismaConfigContent = `import 'dotenv/config';

export default {
  schema: './prisma/schema.prisma',
};
`;
      fs.writeFileSync(path.join(apiDir, 'prisma.config.ts'), prismaConfigContent);
    }

    // Update package.json with custom scripts
    console.log('\n📝 Updating package.json with custom scripts...');
    const packageJsonPath = path.join(apiDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    packageJson.scripts = {
      ...packageJson.scripts,
      'prisma:generate': 'prisma generate',
      'prisma:migrate': 'prisma migrate dev',
      'prisma:migrate:deploy': 'prisma migrate deploy',
      'prisma:migrate:status': 'prisma migrate status',
      'prisma:studio': 'prisma studio',
      'prisma:seed': 'ts-node prisma/seed.ts',
      'prisma:reset': 'prisma migrate reset',
      'db:push': 'prisma db push',
      'db:seed': 'prisma db seed',
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

    // Create docker-compose.yml for PostgreSQL
    console.log('\n🐳 Creating docker-compose.yml...');
    const dockerComposeContent = `version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: ${apiName}-db
    restart: unless-stopped
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: ${apiName}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
    driver: local
`;
    fs.writeFileSync(path.join(apiDir, 'docker-compose.yml'), dockerComposeContent);

    // Update README with setup instructions
    console.log('\n📚 Updating README.md...');
    const readmeContent = `# ${capitalize(apiName)} Service

A NestJS microservice for ${apiName} management with ${transportType === 'rest' ? 'REST API' : transportType} architecture.

## 🚀 Features

- **Framework**: NestJS 11
- **Transport**: ${transportType === 'rest' ? 'REST API with Swagger' : capitalize(transportType)}
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: class-validator + class-transformer
- **Security**: Helmet + CORS
- **Documentation**: ${transportType === 'rest' ? 'Auto-generated Swagger/OpenAPI' : 'Built-in'}

## 🚦 Getting Started

### Installation

\`\`\`bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env

# Start PostgreSQL (Docker)
docker-compose up -d

# Generate Prisma client
pnpm prisma:generate

# Run database migrations
pnpm prisma:migrate

# Start development server
pnpm start:dev
\`\`\`

### Access Points

- **API**: http://localhost:${newPort}${transportType === 'rest' ? '/api/v1' : ''}
${transportType === 'rest' ? `- **Swagger Docs**: http://localhost:${newPort}/api/docs` : ''}

## 📝 Available Scripts

\`\`\`bash
# Development
pnpm start:dev          # Start in watch mode
pnpm start:debug        # Start with debugger

# Database
pnpm prisma:generate    # Generate Prisma client
pnpm prisma:migrate     # Run migrations
pnpm prisma:studio      # Open Prisma Studio
pnpm db:push            # Push schema without migrations

# Testing
pnpm test               # Run unit tests
pnpm test:e2e           # Run E2E tests
pnpm test:cov           # Generate coverage

# Build
pnpm build              # Compile TypeScript
pnpm start:prod         # Run production build
\`\`\`

## 📂 Project Structure

\`\`\`
${apiName}/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── main.ts                # Application entry point
│   ├── app.module.ts          # Root module
│   └── ...                    # Your feature modules
├── test/                      # E2E tests
├── .env                       # Environment variables
└── docker-compose.yml         # PostgreSQL container
\`\`\`

## 🔧 Next Steps

1. **Define your database schema** in \`prisma/schema.prisma\`
2. **Generate resources**: \`npx @nestjs/cli generate resource <name>\`
3. **Run migrations**: \`pnpm prisma:migrate\`
4. **Implement your business logic** in feature modules
${transportType === 'rest' ? '5. **Test your API** at http://localhost:' + newPort + '/api/docs' : ''}

## 📚 Documentation

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
${transportType === 'rest' ? '- [Swagger Documentation](https://swagger.io/docs/)' : ''}

---

Generated with Eventure API Generator
`;

    fs.writeFileSync(path.join(apiDir, 'README.md'), readmeContent);

    // Success message
    console.log('\n✅ NestJS microservice created successfully!\n');
    console.log(`📁 Location: apps/${apiName}`);
    console.log(`🏗️  Type: ${transportType === 'rest' ? 'REST API' : capitalize(transportType)}`);
    console.log(`🌐 Dev URL: http://localhost:${newPort}`);
    console.log(`🗄️  Database: ${apiName} (PostgreSQL)`);

    console.log('\n🚀 Next steps:');
    console.log(`   1. cd apps/${apiName}`);
    console.log(`   2. Start PostgreSQL: docker-compose up -d`);
    console.log(`   3. Update prisma/schema.prisma with your models`);
    console.log(`   4. Generate Prisma client: pnpm prisma:generate`);
    console.log(`   5. Run migrations: pnpm prisma:migrate`);
    console.log(`   6. Generate resources: npx @nestjs/cli generate resource <name>`);
    console.log(`   7. Start dev server: pnpm start:dev`);
    if (transportType === 'rest') {
      console.log(`   8. Open Swagger docs: http://localhost:${newPort}/api/docs`);
    }

    console.log('\n✨ Features included:');
    console.log('   ✅ NestJS 11 + TypeScript');
    console.log('   ✅ Prisma ORM + PostgreSQL');
    console.log('   ✅ Docker Compose for database');
    console.log('   ✅ Environment configuration');
    console.log('   ✅ Validation & transformation');
    if (transportType === 'rest') {
      console.log('   ✅ Swagger/OpenAPI documentation');
      console.log('   ✅ Security (Helmet, CORS)');
    }
    console.log('   ✅ Testing setup (Jest)');
    console.log('   ✅ ESLint + Prettier');

    console.log('\n📚 Useful commands:');
    console.log('   • Generate module: npx @nestjs/cli generate module <name>');
    console.log('   • Generate controller: npx @nestjs/cli generate controller <name>');
    console.log('   • Generate service: npx @nestjs/cli generate service <name>');
    console.log('   • Generate resource (full CRUD): npx @nestjs/cli generate resource <name>');

    console.log('\n✨ Happy coding!\n');
  } catch (error) {
    console.error('\n❌ Error creating NestJS microservice:', error.message);
    rl.close();
    process.exit(1);
  }
}

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

// Run the main function
main().catch((error) => {
  console.error('\n❌ Error:', error.message);
  rl.close();
  process.exit(1);
});
