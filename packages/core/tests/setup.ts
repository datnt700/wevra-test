import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// Polyfill structuredClone for Node.js < 17 / older jsdom (fixes whatwg-url error in CI)
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));
}

// Polyfill URLSearchParams if missing (fixes webidl-conversions error)
if (typeof global.URLSearchParams === 'undefined') {
  // @ts-expect-error - Polyfill for CI environment
  global.URLSearchParams = class URLSearchParams {
    constructor() {}
    get() {
      return null;
    }
    set() {}
    append() {}
    delete() {}
    has() {
      return false;
    }
    toString() {
      return '';
    }
  };
}

// Mock ResizeObserver for Radix UI components
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

afterEach(() => {
  cleanup();
});
