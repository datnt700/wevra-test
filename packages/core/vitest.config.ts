import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // 👋 add the line below to add jsdom to vite
    environment: 'jsdom',
    // hey! 👋 over here
    globals: true,
    setupFiles: ['./tests/setup.ts'], // assuming the test folder is in the root of our project
    include: ['./lib/**/*.test.tsx'],
    exclude: ['./lib/common/*'],
    coverage: {
      provider: 'istanbul', // or 'c8',
      all: true
    }
  }
});
