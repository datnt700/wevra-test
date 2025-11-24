import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/index.ts',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.stories.{ts,tsx}',
      ],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
    // Exclude node_modules except for packages that need to be transformed
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Alias react-native to react-native-web for web testing
      'react-native': 'react-native-web',
      // Alias React Native specific modules
      'react-native/Libraries/Animated/NativeAnimatedHelper':
        'react-native-web/dist/modules/UnimplementedView',
      'react-native/Libraries/Components/View/ViewNativeComponent':
        'react-native-web/dist/exports/View',
    },
  },
});
