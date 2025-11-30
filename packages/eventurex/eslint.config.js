import base from '@repo/eslint-config/base';

export default [
  ...base,
  {
    ignores: ['babel.config.js'],
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
