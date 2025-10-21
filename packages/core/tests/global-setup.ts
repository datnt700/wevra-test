/**
 * Global setup file that runs BEFORE the test environment is initialized.
 * This is critical for polyfills that need to exist before jsdom loads.
 */
export default function setup() {
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
      msg.includes('There is no node type named')
    ) {
      return true; // Suppress error
    }
    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }
    return false;
  };

  // Polyfill structuredClone for Node.js < 17 / older jsdom (fixes whatwg-url error in CI)
  if (typeof global.structuredClone === 'undefined') {
    global.structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));
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

  // Polyfill URLSearchParams if missing (fixes webidl-conversions error)
  if (typeof global.URLSearchParams === 'undefined') {
    // @ts-expect-error - Polyfill for CI environment
    global.URLSearchParams = class URLSearchParams {
      private params: Map<string, string[]>;

      constructor(init?: string | Record<string, string> | URLSearchParams) {
        this.params = new Map();
        if (typeof init === 'string') {
          // Simple query string parsing
          const pairs = init.replace(/^\?/, '').split('&');
          pairs.forEach((pair) => {
            const [key, value] = pair.split('=');
            if (key) {
              this.append(decodeURIComponent(key), value ? decodeURIComponent(value) : '');
            }
          });
        } else if (init && typeof init === 'object') {
          Object.entries(init).forEach(([key, value]) => {
            this.append(key, String(value));
          });
        }
      }

      append(name: string, value: string) {
        const existing = this.params.get(name);
        if (existing) {
          existing.push(value);
        } else {
          this.params.set(name, [value]);
        }
      }

      delete(name: string) {
        this.params.delete(name);
      }

      get(name: string) {
        const values = this.params.get(name);
        return values ? values[0] : null;
      }

      getAll(name: string) {
        return this.params.get(name) || [];
      }

      has(name: string) {
        return this.params.has(name);
      }

      set(name: string, value: string) {
        this.params.set(name, [value]);
      }

      toString() {
        const parts: string[] = [];
        this.params.forEach((values, key) => {
          values.forEach((value) => {
            parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
          });
        });
        return parts.join('&');
      }

      forEach(callback: (value: string, key: string, parent: URLSearchParams) => void) {
        this.params.forEach((values, key) => {
          values.forEach((value) => {
            callback(value, key, this);
          });
        });
      }

      keys() {
        return Array.from(this.params.keys())[Symbol.iterator]();
      }

      values() {
        const allValues: string[] = [];
        this.params.forEach((values) => {
          allValues.push(...values);
        });
        return allValues[Symbol.iterator]();
      }

      entries() {
        const entries: [string, string][] = [];
        this.params.forEach((values, key) => {
          values.forEach((value) => {
            entries.push([key, value]);
          });
        });
        return entries[Symbol.iterator]();
      }

      [Symbol.iterator]() {
        return this.entries();
      }
    };
  }
}
