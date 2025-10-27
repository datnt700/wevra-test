#!/usr/bin/env node

import { generateModule } from '../src/index.js';

generateModule().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
