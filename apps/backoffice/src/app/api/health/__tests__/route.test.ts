import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GET, POST } from '../route';
import { NextRequest } from 'next/server';

describe('/api/health', () => {
  let originalEnv: string | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    originalEnv = process.env.NODE_ENV;
    // Use vi.stubEnv to set environment variables
    vi.stubEnv('NODE_ENV', originalEnv || 'test');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('GET /api/health', () => {
    it('should return status ok', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.status).toBe('ok');
    });

    it('should return timestamp', async () => {
      const response = await GET();
      const data = await response.json();

      expect(data.timestamp).toBeDefined();
      expect(typeof data.timestamp).toBe('string');
      // Verify it's a valid ISO date
      expect(new Date(data.timestamp).toISOString()).toBe(data.timestamp);
    });

    it('should return environment in development', async () => {
      vi.stubEnv('NODE_ENV', 'development');
      const response = await GET();
      const data = await response.json();

      expect(data.environment).toBe('development');
    });

    it('should return environment in production', async () => {
      vi.stubEnv('NODE_ENV', 'production');
      const response = await GET();
      const data = await response.json();

      expect(data.environment).toBe('production');
    });

    it('should return environment in test', async () => {
      vi.stubEnv('NODE_ENV', 'test');
      const response = await GET();
      const data = await response.json();

      expect(data.environment).toBe('test');
    });

    it('should return valid JSON response', async () => {
      const response = await GET();
      const data = await response.json();

      expect(data).toHaveProperty('status');
      expect(data).toHaveProperty('timestamp');
      expect(data).toHaveProperty('environment');
    });

    it('should have correct response structure', async () => {
      const response = await GET();
      const data = await response.json();

      expect(Object.keys(data)).toEqual(['status', 'timestamp', 'environment']);
    });
  });

  describe('POST /api/health', () => {
    it('should return success with valid message', async () => {
      const request = new NextRequest('http://localhost:3000/api/health', {
        method: 'POST',
        body: JSON.stringify({ message: 'test message' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.message).toBe('test message');
    });

    it('should return timestamp in response', async () => {
      const request = new NextRequest('http://localhost:3000/api/health', {
        method: 'POST',
        body: JSON.stringify({ message: 'test' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.timestamp).toBeDefined();
      expect(typeof data.timestamp).toBe('string');
      expect(new Date(data.timestamp).toISOString()).toBe(data.timestamp);
    });

    it('should return error when message is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/health', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Message is required');
    });

    it('should return error when message is empty string', async () => {
      const request = new NextRequest('http://localhost:3000/api/health', {
        method: 'POST',
        body: JSON.stringify({ message: '' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Message is required');
    });

    it('should return error when message is null', async () => {
      const request = new NextRequest('http://localhost:3000/api/health', {
        method: 'POST',
        body: JSON.stringify({ message: null }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Message is required');
    });

    it('should handle additional data fields', async () => {
      const request = new NextRequest('http://localhost:3000/api/health', {
        method: 'POST',
        body: JSON.stringify({
          message: 'test',
          extra: 'data',
          number: 123,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.message).toBe('test');
      expect(data.data.extra).toBe('data');
      expect(data.data.number).toBe(123);
    });

    it('should return 500 for invalid JSON', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const request = new NextRequest('http://localhost:3000/api/health', {
        method: 'POST',
        body: 'invalid json',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Internal server error');
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('should log error for invalid JSON', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const request = new NextRequest('http://localhost:3000/api/health', {
        method: 'POST',
        body: 'invalid json',
      });

      await POST(request);

      expect(consoleErrorSpy).toHaveBeenCalledWith('API Error:', expect.any(Error));

      consoleErrorSpy.mockRestore();
    });

    it('should handle empty request body', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const request = new NextRequest('http://localhost:3000/api/health', {
        method: 'POST',
        body: '',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Internal server error');

      consoleErrorSpy.mockRestore();
    });
  });

  describe('response headers', () => {
    it('should return JSON content type for GET', async () => {
      const response = await GET();
      const contentType = response.headers.get('content-type');

      expect(contentType).toContain('application/json');
    });

    it('should return JSON content type for successful POST', async () => {
      const request = new NextRequest('http://localhost:3000/api/health', {
        method: 'POST',
        body: JSON.stringify({ message: 'test' }),
      });

      const response = await POST(request);
      const contentType = response.headers.get('content-type');

      expect(contentType).toContain('application/json');
    });

    it('should return JSON content type for error POST', async () => {
      const request = new NextRequest('http://localhost:3000/api/health', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      const response = await POST(request);
      const contentType = response.headers.get('content-type');

      expect(contentType).toContain('application/json');
    });
  });
});
