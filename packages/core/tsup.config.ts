import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  splitting: false,
  esbuildOptions(options) {
    options.loader = { '.css': 'css' }; // Ensures CSS is bundled
  },
});
