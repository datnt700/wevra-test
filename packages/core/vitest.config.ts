import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // 👋 add the line below to add jsdom to vite
    environment: 'jsdom',
    // hey! 👋 over here
    globals: true,
    globalSetup: './tests/global-setup.ts', // Runs BEFORE environment setup
    setupFiles: ['./tests/setup.ts'], // assuming the test folder is in the root of our project
    include: ['./src/**/*.test.tsx', './src/**/*.test.ts'],
    exclude: ['./lib/common/*', '**/node_modules/**'],
    testTimeout: 15000, // 15 seconds per test (for complex Radix UI interactions)
    hookTimeout: 15000, // 15 seconds for setup/teardown hooks
    coverage: {
      provider: 'istanbul',
      all: true,
      include: ['src/ui/**/*.{ts,tsx}', 'src/lib/**/*.ts', 'src/hooks/**/*.ts'],
      exclude: [
        '**/*.test.{ts,tsx}',
        '**/*.d.ts',
        '**/types/**',
        '**/index.ts',
        '**/*.styles.ts',
        '**/tests/**',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
      reporter: ['text', 'json', 'html'],
    },
  },
});
