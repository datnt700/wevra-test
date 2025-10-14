import { config as reactConfig } from '@repo/eslint-config/react-internal.js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...reactConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', '.turbo/**', 'coverage/**', 'tests/setup.ts'],
  },
];
