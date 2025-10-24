import { config } from '@repo/eslint-config/base';

export default [
  ...config,
  {
    ignores: ['node_modules/**', '.expo/**', 'android/**', 'ios/**', 'dist/**', '.cache/**'],
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
