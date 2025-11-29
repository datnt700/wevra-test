import nextJsConfig from '@repo/eslint-config/next-js';
import storybookPlugin from 'eslint-plugin-storybook';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  ...storybookPlugin.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.stories.tsx', '**/*.stories.ts'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'storybook-static/**',
      '.turbo/**',
      'dist/**',
    ],
  },
];
