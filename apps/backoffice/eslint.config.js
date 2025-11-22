import { nextJsConfig } from '@repo/eslint-config/next-js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    ignores: [
      '.next/**',
      '.turbo/**',
      'dist/**',
      'node_modules/**',
      'build/**',
      'coverage/**',
      '*.log',
      'next-env.d.ts',
    ],
  },
];
