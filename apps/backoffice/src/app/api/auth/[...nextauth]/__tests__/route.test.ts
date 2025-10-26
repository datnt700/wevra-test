import { describe, it, expect, vi } from 'vitest';

// Mock the auth lib handlers - must be defined before import
vi.mock('@/lib/auth', () => ({
  handlers: {
    GET: vi.fn(),
    POST: vi.fn(),
  },
}));

import { GET, POST } from '../route';

describe('/api/auth/[...nextauth]', () => {
  describe('GET handler', () => {
    it('should export GET handler from auth lib', () => {
      expect(GET).toBeDefined();
    });

    it('should be a function', () => {
      expect(typeof GET).toBe('function');
    });
  });

  describe('POST handler', () => {
    it('should export POST handler from auth lib', () => {
      expect(POST).toBeDefined();
    });

    it('should be a function', () => {
      expect(typeof POST).toBe('function');
    });
  });

  describe('route exports', () => {
    it('should export both GET and POST handlers', () => {
      expect(GET).toBeDefined();
      expect(POST).toBeDefined();
    });

    it('should have GET and POST as distinct handlers', () => {
      expect(GET).not.toBe(POST);
    });
  });
});
