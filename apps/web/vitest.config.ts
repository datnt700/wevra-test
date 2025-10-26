import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['**/*.test.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/e2e/**', '**/.next/**'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      include: ['src/lib/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}', 'src/app/**/*.{ts,tsx}'],
      exclude: [
        '**/*.d.ts',
        '**/*.config.*',
        '**/node_modules/**',
        '**/.next/**',
        '**/e2e/**',
        '**/styles.ts', // Exclude Emotion styled components
        'src/lib/auth.ts', // Complex auth with Prisma/NextAuth
        'src/lib/env.ts', // Environment validation
        'src/lib/prisma.ts', // Database client
        'src/components/LocaleSwitcher/**', // UI component - low priority
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      react: path.resolve(__dirname, '../../node_modules/.pnpm/react@19.2.0/node_modules/react'),
      'react-dom': path.resolve(
        __dirname,
        '../../node_modules/.pnpm/react-dom@19.2.0_react@19.2.0/node_modules/react-dom'
      ),
      'react/jsx-runtime': path.resolve(
        __dirname,
        '../../node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-runtime'
      ),
      'react/jsx-dev-runtime': path.resolve(
        __dirname,
        '../../node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-dev-runtime'
      ),
    },
  },
});
