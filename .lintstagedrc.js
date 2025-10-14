module.exports = {
  // Format all supported files
  '*.{js,jsx,ts,tsx,json,md,mdx,css,scss,yaml,yml}': ['prettier --write'],
  // Type check only (linting is handled by turbo in each workspace)
  '*.{ts,tsx}': [() => 'pnpm type-check'],
};
