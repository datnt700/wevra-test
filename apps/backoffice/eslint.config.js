import nextJsConfig from '@repo/eslint-config/next-js';

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
      'playwright-report/**',
      'test-results/**',
      'e2e/**',
      '*.log',
      'next-env.d.ts',
    ],
  },
  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      globals: {
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        exports: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
