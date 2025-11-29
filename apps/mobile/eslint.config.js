import baseConfig from '@repo/eslint-config/base';
import globals from 'globals';

export default [
  ...baseConfig,
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'android/**',
      'ios/**',
      'dist/**',
      '.cache/**',
      'jest.config.js',
      'jest.setup.js',
      'babel.config.js',
    ],
  },
  {
    // Jest test files
    files: ['**/__tests__/**/*.js', '**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
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
