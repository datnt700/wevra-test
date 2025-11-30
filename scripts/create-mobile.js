#!/usr/bin/env node

/**
 * Create a new Expo mobile app in the Eventure monorepo
 * Uses Expo's official generator, then customizes for Eventure patterns
 * Usage: pnpm create:mobile [app-name]
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

// Get app name from command line (optional)
let appName = process.argv[2];

// Main function to handle interactive prompts
async function main() {
  console.log('\n📱 Eventure Mobile App Generator\n');

  // Step 1: Get app name
  if (!appName) {
    appName = await question('? What name would you like to use for the mobile app? ');
  }

  if (!appName) {
    console.error('\n❌ Error: App name is required');
    rl.close();
    process.exit(1);
  }

  // Validate app name
  if (!/^[a-z][a-z0-9-]*$/.test(appName)) {
    console.error(
      '\n❌ Error: App name must be lowercase, start with a letter, and contain only letters, numbers, and hyphens'
    );
    rl.close();
    process.exit(1);
  }

  const appsDir = path.join(__dirname, '..', 'apps');
  const appDir = path.join(appsDir, appName);

  // Check if app already exists
  if (fs.existsSync(appDir)) {
    console.error(`\n❌ Error: App "${appName}" already exists at apps/${appName}`);
    rl.close();
    process.exit(1);
  }

  // Step 2: Choose creation method
  console.log('\n? How would you like to create the app?');
  console.log('  1) Use Expo CLI (recommended) - Official Expo templates');
  console.log('  2) Use Eventure template - Pre-configured with all Eventure patterns');

  const methodChoice = await question('\nEnter your choice (1 or 2) [default: 1]: ');

  if (methodChoice === '2') {
    await createFromEventureTemplate(appName, appDir);
  } else {
    // Step 3: Choose Expo template if using CLI
    console.log('\n? Which Expo template would you like to use?');
    console.log('  1) Blank (TypeScript) - Minimal setup with TypeScript');
    console.log('  2) Tabs (TypeScript) - Bottom tabs navigation (recommended for Eventure)');
    console.log('  3) Drawer (TypeScript) - Side drawer navigation');

    const templateChoice = await question('\nEnter your choice (1, 2, or 3) [default: 2]: ');

    let expoTemplate = 'tabs'; // Default to tabs
    if (templateChoice === '1') {
      expoTemplate = 'blank-typescript';
    } else if (templateChoice === '3') {
      expoTemplate = 'drawer-typescript';
    } else {
      expoTemplate = 'tabs'; // Tabs with TypeScript
    }

    await createExpoApp(appName, appDir, expoTemplate);
  }

  rl.close();
}

/**
 * Create an Expo app using official CLI, then customize for Eventure
 */
async function createExpoApp(appName, appDir, expoTemplate) {
  console.log(`\n🚀 Creating new Expo mobile app: ${appName}\n`);

  const appsDir = path.dirname(appDir);

  try {
    // Step 1: Try to create Expo app using official generator
    console.log(`📱 Running: npx create-expo-app@latest ${appName} --template ${expoTemplate}\n`);

    try {
      execSync(`npx create-expo-app@latest ${appName} --template ${expoTemplate}`, {
        cwd: appsDir,
        stdio: 'inherit',
        shell: true,
      });
      console.log('\n✅ Expo app created successfully!\n');
    } catch {
      console.warn('\n⚠️  Expo CLI failed, falling back to Eventure template...\n');
      await createFromEventureTemplate(appName, appDir);
      return;
    }

    // Step 2: Customize for Eventure monorepo
    console.log('🔧 Customizing for Eventure monorepo...\n');

    await customizeForEventure(appDir, appName);

    // Success message
    printSuccessMessage(appName, expoTemplate);
  } catch (error) {
    console.error('\n❌ Error creating Expo app:', error.message);

    // Cleanup if failed
    if (fs.existsSync(appDir)) {
      console.log('🧹 Cleaning up...');
      fs.rmSync(appDir, { recursive: true, force: true });
    }

    process.exit(1);
  }
}

/**
 * Create app from Eventure's mobile-app template
 */
async function createFromEventureTemplate(appName, appDir) {
  console.log(`\n🚀 Creating mobile app from Eventure template: ${appName}\n`);

  const templatesDir = path.join(__dirname, '..', 'templates');
  const templateDir = path.join(templatesDir, 'mobile-app');

  if (!fs.existsSync(templateDir)) {
    console.error('❌ Error: Mobile template not found at templates/mobile-app');
    console.log('Please ensure the mobile-app template exists.');
    process.exit(1);
  }

  try {
    // Copy template
    console.log('📋 Copying Eventure mobile template...');
    fs.cpSync(templateDir, appDir, {
      recursive: true,
      filter: (src) => {
        // Skip node_modules, .expo, and other build artifacts
        const basename = path.basename(src);
        return !['node_modules', '.expo', 'dist', '.cache', 'README.md'].includes(basename);
      },
    });

    // Customize for specific app
    console.log('🔧 Customizing for your app...\n');
    await customizeTemplateForApp(appDir, appName);

    // Copy APP_README.md to README.md
    const appReadmePath = path.join(appDir, 'APP_README.md');
    const readmePath = path.join(appDir, 'README.md');
    if (fs.existsSync(appReadmePath)) {
      fs.copyFileSync(appReadmePath, readmePath);
      fs.unlinkSync(appReadmePath);
    }

    // Success message
    printSuccessMessage(appName, 'Eventure template (tabs)');
  } catch (error) {
    console.error('\n❌ Error creating app from template:', error.message);

    // Cleanup if failed
    if (fs.existsSync(appDir)) {
      console.log('🧹 Cleaning up...');
      fs.rmSync(appDir, { recursive: true, force: true });
    }

    process.exit(1);
  }
}

/**
 * Customize Expo-generated app for Eventure
 */
async function customizeForEventure(appDir, appName) {
  // Update package.json
  await updatePackageJson(appDir, appName);

  // Add/update ESLint config
  await addEslintConfig(appDir);

  // Update TypeScript config
  await updateTsConfig(appDir);

  // Add environment files
  await addEnvFile(appDir, appName);

  // Add/update testing setup
  await addTestingSetup(appDir);

  // Add Eventure utilities (API client, hooks)
  await addEventureUtilities(appDir);

  console.log('✅ Eventure customization complete');
}

/**
 * Customize template-based app for specific app name
 */
async function customizeTemplateForApp(appDir, appName) {
  // Update package.json
  console.log('📝 Updating package.json...');
  const packageJsonPath = path.join(appDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  packageJson.name = `@eventure/${appName}`;
  packageJson.version = '0.1.0';

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('✅ package.json updated');

  // Update app.json
  console.log('📱 Updating app.json...');
  const appJsonPath = path.join(appDir, 'app.json');
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf-8'));

  appJson.expo.name = capitalize(appName);
  appJson.expo.slug = appName;
  appJson.expo.scheme = `eventure-${appName}`;

  // Update bundle identifiers
  if (appJson.expo.ios) {
    appJson.expo.ios.bundleIdentifier = `io.eventure.${appName.replace(/-/g, '')}`;
  }
  if (appJson.expo.android) {
    appJson.expo.android.package = `io.eventure.${appName.replace(/-/g, '')}`;
  }

  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n');
  console.log('✅ app.json updated');

  // Update .env files
  await addEnvFile(appDir, appName);

  console.log('✅ Template customization complete');
}

/**
 * Print success message
 */
function printSuccessMessage(appName, template) {
  console.log('\n✅ Mobile app created successfully!\n');
  console.log('📝 Next steps:');
  console.log(`   1. cd apps/${appName}`);
  console.log('   2. Update .env with your API endpoints');
  console.log('   3. pnpm install');
  console.log('   4. pnpm start - Start Expo dev server');
  console.log('   5. pnpm ios - Run on iOS simulator');
  console.log('   6. pnpm android - Run on Android emulator\n');
  console.log(`📱 App Details:`);
  console.log(`   - Name: ${appName}`);
  console.log(`   - Location: apps/${appName}`);
  console.log(`   - Template: ${template}`);
  console.log(`   - Analytics: @eventure/analytics integrated`);
  console.log(`   - Testing: Jest + React Native Testing Library`);
  console.log(`   - Coverage: 70% threshold\n`);
}

/**
 * Update package.json with Eventure catalog dependencies
 */
async function updatePackageJson(appDir, appName) {
  console.log('📝 Updating package.json with catalog dependencies...');

  const packageJsonPath = path.join(appDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  // Update name and version
  packageJson.name = `@eventure/${appName}`;
  packageJson.version = '0.1.0';
  packageJson.private = true;

  // Update scripts
  packageJson.scripts = {
    ...packageJson.scripts,
    lint: 'eslint . --max-warnings 0',
    'type-check': 'tsc --noEmit',
    format: 'prettier --write "**/*.{ts,tsx,js,jsx,json}"',
    'format:check': 'prettier --check "**/*.{ts,tsx,js,jsx,json}"',
    'test:watch': 'jest --watch',
    'test:coverage': 'jest --coverage',
    clean: 'rm -rf .expo node_modules',
  };

  // Add Eventure workspace packages
  packageJson.dependencies = {
    ...packageJson.dependencies,
    '@eventure/analytics': 'workspace:*',
    zod: 'catalog:',
  };

  // Update dev dependencies to use catalog
  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    '@repo/eslint-config': 'workspace:*',
    '@repo/typescript-config': 'workspace:*',
    '@testing-library/react-native': 'catalog:expo',
    '@types/jest': '^29.5.14',
    eslint: 'catalog:',
    prettier: 'catalog:',
    typescript: 'catalog:',
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('✅ package.json updated');
}

/**
 * Add ESLint config following Eventure's ESLint 9 flat config pattern
 */
async function addEslintConfig(appDir) {
  console.log('⚙️  Adding ESLint config...');

  const eslintConfig = `import { config } from '@repo/eslint-config/base';

export default [
  ...config,
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'android/**',
      'ios/**',
      'dist/**',
      '.cache/**',
    ],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];
`;

  fs.writeFileSync(path.join(appDir, 'eslint.config.js'), eslintConfig);
  console.log('✅ eslint.config.js created');
}

/**
 * Update tsconfig.json to extend Eventure's base config
 */
async function updateTsConfig(appDir) {
  console.log('📘 Updating tsconfig.json...');

  const tsconfigPath = path.join(appDir, 'tsconfig.json');

  if (fs.existsSync(tsconfigPath)) {
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));

    // Extend Eventure's base config
    tsconfig.extends = '@repo/typescript-config/react-library.json';

    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2) + '\n');
    console.log('✅ tsconfig.json updated');
  }
}

/**
 * Add .env.example file
 */
async function addEnvFile(appDir, appName) {
  console.log('🔐 Creating .env.example...');

  const envExample = `# Eventure ${capitalize(appName)} Mobile App - Environment Variables

# API Configuration
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_ANALYTICS_API_URL=http://localhost:3001

# Analytics
EXPO_PUBLIC_ANALYTICS_API_KEY=your-analytics-api-key-here

# App Configuration
EXPO_PUBLIC_APP_NAME=${capitalize(appName)}
EXPO_PUBLIC_APP_VERSION=0.1.0

# Feature Flags
EXPO_PUBLIC_ENABLE_ANALYTICS=true
EXPO_PUBLIC_ENABLE_DEBUG=true
`;

  fs.writeFileSync(path.join(appDir, '.env.example'), envExample);
  fs.writeFileSync(path.join(appDir, '.env'), envExample);
  console.log('✅ .env.example and .env created');
}

/**
 * Add Jest testing setup
 */
async function addTestingSetup(appDir) {
  console.log('🧪 Setting up testing infrastructure...');

  const jestConfigPath = path.join(appDir, 'jest.config.js');
  const jestSetupPath = path.join(appDir, 'jest.setup.js');

  // Only create if doesn't exist (don't overwrite Expo's config)
  if (!fs.existsSync(jestConfigPath)) {
    const jestConfig = `module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
    '!**/.expo/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
`;
    fs.writeFileSync(jestConfigPath, jestConfig);
  }

  // Create jest.setup.js
  const jestSetup = `import '@testing-library/react-native/extend-expect';

// Mock Expo modules
jest.mock('expo-font');
jest.mock('expo-asset');
jest.mock('expo-constants', () => ({
  expoConfig: {
    name: 'Eventure Mobile App',
    slug: 'eventure-mobile-app',
  },
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  Link: 'Link',
  Tabs: 'Tabs',
  Stack: 'Stack',
}));
`;

  fs.writeFileSync(jestSetupPath, jestSetup);

  // Add example test only if __tests__ doesn't exist
  const testsDir = path.join(appDir, '__tests__');
  if (!fs.existsSync(testsDir)) {
    fs.mkdirSync(testsDir, { recursive: true });

    const exampleTest = `import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

describe('Example Test', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Text>Hello Eventure</Text>);
    expect(getByText('Hello Eventure')).toBeTruthy();
  });
});
`;

    fs.writeFileSync(path.join(testsDir, 'example.test.tsx'), exampleTest);
  }

  console.log('✅ Testing setup complete');
}

/**
 * Add Eventure-specific utilities and hooks
 */
async function addEventureUtilities(appDir) {
  console.log('🛠️  Adding Eventure utilities...');

  // Create utils directory
  const utilsDir = path.join(appDir, 'utils');
  if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir, { recursive: true });
  }

  // Add API client utility
  const apiClient = `import Constants from 'expo-constants';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const api = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(\`\${API_URL}\${endpoint}\`);
    if (!response.ok) throw new Error(\`API Error: \${response.statusText}\`);
    return response.json();
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(\`\${API_URL}\${endpoint}\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(\`API Error: \${response.statusText}\`);
    return response.json();
  },
};
`;

  fs.writeFileSync(path.join(utilsDir, 'api.ts'), apiClient);

  // Create hooks directory
  const hooksDir = path.join(appDir, 'hooks');
  if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true });
  }

  // Add useColorScheme hook
  const useColorScheme = `import { useColorScheme as useRNColorScheme } from 'react-native';

export function useColorScheme() {
  return useRNColorScheme() ?? 'light';
}
`;

  fs.writeFileSync(path.join(hooksDir, 'useColorScheme.ts'), useColorScheme);

  console.log('✅ Eventure utilities added');
}

/**
 * Capitalize first letter
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Run the main function
main().catch((error) => {
  console.error('Error:', error);
  rl.close();
  process.exit(1);
});
