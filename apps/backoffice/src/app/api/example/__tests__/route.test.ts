import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST, DELETE } from '../route';
import { NextRequest } from 'next/server';

// Mock next-intl/server
const mockGetLocale = vi.fn();
vi.mock('next-intl/server', () => ({
  getLocale: () => mockGetLocale(),
}));

describe('/api/example', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetLocale.mockResolvedValue('en');
  });

  describe('GET /api/example', () => {
    it('should return example response', async () => {
      const request = new NextRequest('http://localhost:3000/api/example');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe('Example API response');
    });

    it('should include current locale', async () => {
      mockGetLocale.mockResolvedValue('vi');
      const request = new NextRequest('http://localhost:3000/api/example');
      const response = await GET(request);
      const data = await response.json();

      expect(data.locale).toBe('vi');
      expect(mockGetLocale).toHaveBeenCalled();
    });

    it('should include timestamp', async () => {
      const request = new NextRequest('http://localhost:3000/api/example');
      const response = await GET(request);
      const data = await response.json();

      expect(data.timestamp).toBeDefined();
      expect(typeof data.timestamp).toBe('string');
      expect(new Date(data.timestamp).toISOString()).toBe(data.timestamp);
    });

    it('should handle query parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/example?q=test');
      const response = await GET(request);
      const data = await response.json();

      expect(data.query).toBe('test');
    });

    it('should handle multiple query parameters', async () => {
      const request = new NextRequest('http://localhost:3000/api/example?q=search&page=1');
      const response = await GET(request);
      const data = await response.json();

      expect(data.query).toBe('search');
    });

    it('should handle missing query parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/example');
      const response = await GET(request);
      const data = await response.json();

      expect(data.query).toBeNull();
    });

    it('should handle empty query parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/example?q=');
      const response = await GET(request);
      const data = await response.json();

      expect(data.query).toBe('');
    });

    it('should call getLocale for each request', async () => {
      const request = new NextRequest('http://localhost:3000/api/example');
      await GET(request);

      expect(mockGetLocale).toHaveBeenCalledTimes(1);
    });

    it('should handle en locale', async () => {
      mockGetLocale.mockResolvedValue('en');
      const request = new NextRequest('http://localhost:3000/api/example');
      const response = await GET(request);
      const data = await response.json();

      expect(data.locale).toBe('en');
    });
  });

  describe('POST /api/example', () => {
    it('should create item with valid name', async () => {
      const request = new NextRequest('http://localhost:3000/api/example', {
        method: 'POST',
        body: JSON.stringify({ name: 'Test Item' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.name).toBe('Test Item');
    });

    it('should generate random ID', async () => {
      const request = new NextRequest('http://localhost:3000/api/example', {
        method: 'POST',
        body: JSON.stringify({ name: 'Test' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.data.id).toBeDefined();
      expect(typeof data.data.id).toBe('string');
      expect(data.data.id.length).toBeGreaterThan(0);
    });

    it('should include locale in response', async () => {
      mockGetLocale.mockResolvedValue('vi');
      const request = new NextRequest('http://localhost:3000/api/example', {
        method: 'POST',
        body: JSON.stringify({ name: 'Test' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.data.locale).toBe('vi');
    });

    it('should include createdAt timestamp', async () => {
      const request = new NextRequest('http://localhost:3000/api/example', {
        method: 'POST',
        body: JSON.stringify({ name: 'Test' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.data.createdAt).toBeDefined();
      expect(new Date(data.data.createdAt).toISOString()).toBe(data.data.createdAt);
    });

    it('should return error when name is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/example', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Name is required and must be a string');
    });

    it('should return error when name is not a string', async () => {
      const request = new NextRequest('http://localhost:3000/api/example', {
        method: 'POST',
        body: JSON.stringify({ name: 123 }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Name is required and must be a string');
    });

    it('should return error when name is null', async () => {
      const request = new NextRequest('http://localhost:3000/api/example', {
        method: 'POST',
        body: JSON.stringify({ name: null }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Name is required and must be a string');
    });

    it('should return error when name is empty string', async () => {
      const request = new NextRequest('http://localhost:3000/api/example', {
        method: 'POST',
        body: JSON.stringify({ name: '' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Name is required and must be a string');
    });

    it('should handle invalid JSON', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const request = new NextRequest('http://localhost:3000/api/example', {
        method: 'POST',
        body: 'invalid json',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to process request');
      expect(consoleErrorSpy).toHaveBeenCalledWith('API Error:', expect.any(Error));

      consoleErrorSpy.mockRestore();
    });

    it('should handle additional fields in body', async () => {
      const request = new NextRequest('http://localhost:3000/api/example', {
        method: 'POST',
        body: JSON.stringify({ name: 'Test', extra: 'field', count: 5 }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.data.name).toBe('Test');
    });
  });

  describe('DELETE /api/example', () => {
    it('should delete item with valid ID', async () => {
      const request = new NextRequest('http://localhost:3000/api/example?id=123');

      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Deleted item with ID: 123');
    });

    it('should handle alphanumeric ID', async () => {
      const request = new NextRequest('http://localhost:3000/api/example?id=abc123xyz');

      const response = await DELETE(request);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.message).toContain('abc123xyz');
    });

    it('should return error when ID is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/example');

      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('ID is required');
    });

    it('should return error when ID is empty', async () => {
      const request = new NextRequest('http://localhost:3000/api/example?id=');

      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('ID is required');
    });

    it('should handle UUID format ID', async () => {
      const uuid = '550e8400-e29b-41d4-a716-446655440000';
      const request = new NextRequest(`http://localhost:3000/api/example?id=${uuid}`);

      const response = await DELETE(request);
      const data = await response.json();

      expect(data.message).toContain(uuid);
    });

    it('should ignore additional query parameters', async () => {
      const request = new NextRequest('http://localhost:3000/api/example?id=123&extra=param');

      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe('Deleted item with ID: 123');
    });
  });

  describe('response headers', () => {
    it('should return JSON content type for GET', async () => {
      const request = new NextRequest('http://localhost:3000/api/example');
      const response = await GET(request);

      const contentType = response.headers.get('content-type');
      expect(contentType).toContain('application/json');
    });

    it('should return JSON content type for POST success', async () => {
      const request = new NextRequest('http://localhost:3000/api/example', {
        method: 'POST',
        body: JSON.stringify({ name: 'Test' }),
      });
      const response = await POST(request);

      const contentType = response.headers.get('content-type');
      expect(contentType).toContain('application/json');
    });

    it('should return JSON content type for POST error', async () => {
      const request = new NextRequest('http://localhost:3000/api/example', {
        method: 'POST',
        body: JSON.stringify({}),
      });
      const response = await POST(request);

      const contentType = response.headers.get('content-type');
      expect(contentType).toContain('application/json');
    });

    it('should return JSON content type for DELETE', async () => {
      const request = new NextRequest('http://localhost:3000/api/example?id=123');
      const response = await DELETE(request);

      const contentType = response.headers.get('content-type');
      expect(contentType).toContain('application/json');
    });
  });
});
