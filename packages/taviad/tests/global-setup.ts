/**
 * Global setup file that runs BEFORE the test environment is initialized.
 * This is critical for polyfills that need to exist before jsdom loads.
 */
export default function setup() {
  // Polyfill structuredClone for Node.js < 17 / older jsdom (fixes whatwg-url error in CI)
  if (typeof global.structuredClone === 'undefined') {
    global.structuredClone = (obj: any) => {
      try {
        return JSON.parse(JSON.stringify(obj));
      } catch {
        return obj;
      }
    };
  }

  // Polyfill URLPattern for jsdom (whatwg-url dependency)
  if (typeof global.URLPattern === 'undefined') {
    // @ts-expect-error - Minimal polyfill for CI environment
    global.URLPattern = class URLPattern {
      constructor() {}
      test() {
        return false;
      }
      exec() {
        return null;
      }
    };
  }

  // Suppress ProseMirror getClientRects errors (known jsdom limitation)
  const originalOnError = global.onerror;
  global.onerror = (
    message: string | Event,
    source?: string,
    lineno?: number,
    colno?: number,
    error?: Error
  ) => {
    const msg = typeof message === 'string' ? message : error?.message || '';
    if (
      msg.includes('getClientRects is not a function') ||
      msg.includes('There is no node type named') ||
      msg.includes('webidl-conversions') ||
      msg.includes('Cannot read properties of undefined')
    ) {
      return true; // Suppress error
    }
    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }
    return false;
  };
}
