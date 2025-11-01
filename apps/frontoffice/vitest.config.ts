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
    exclude: ['**/node_modules/**', '**/.next/**'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      include: ['src/lib/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}'],
      exclude: [
        '**/*.d.ts',
        '**/*.config.*',
        '**/node_modules/**',
        '**/.next/**',
        '**/styles.ts',
        'src/lib/prisma.ts',
      ],
      thresholds: {
        lines: 30,
        functions: 30,
        branches: 30,
        statements: 30,
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
