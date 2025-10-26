import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST, GET } from '../route';
import { NextRequest } from 'next/server';

// Mock Prisma
const mockCreateMany = vi.fn();
vi.mock('@/lib/prisma', () => ({
  prisma: {
    analyticsEvent: {
      createMany: (...args: unknown[]) => mockCreateMany(...args),
    },
  },
}));

describe('/api/analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.ANALYTICS_API_KEY;
  });

  describe('GET /api/analytics', () => {
    it('should return health check status', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.status).toBe('ok');
    });

    it('should include service name', async () => {
      const response = await GET();
      const data = await response.json();

      expect(data.service).toBe('Analytics API');
    });

    it('should include version', async () => {
      const response = await GET();
      const data = await response.json();

      expect(data.version).toBe('1.0.0');
    });

    it('should include timestamp', async () => {
      const response = await GET();
      const data = await response.json();

      expect(data.timestamp).toBeDefined();
      expect(new Date(data.timestamp).toISOString()).toBe(data.timestamp);
    });
  });

  describe('POST /api/analytics', () => {
    describe('validation', () => {
      it('should return error when events array is missing', async () => {
        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({}),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe('Invalid request: events array required');
      });

      it('should return error when events is not an array', async () => {
        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({ events: 'not an array' }),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe('Invalid request: events array required');
      });

      it('should return error when events array is empty', async () => {
        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({ events: [] }),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe('Invalid request: events array required');
      });

      it('should return error when API key is invalid', async () => {
        process.env.ANALYTICS_API_KEY = 'secret-key';

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          headers: {
            authorization: 'Bearer wrong-key',
          },
          body: JSON.stringify({
            events: [{ type: 'pageview', url: '/test' }],
          }),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(401);
        expect(data.error).toBe('Unauthorized');
      });

      it('should accept request when API key is valid', async () => {
        process.env.ANALYTICS_API_KEY = 'secret-key';
        mockCreateMany.mockResolvedValue({ count: 1 });

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          headers: {
            authorization: 'Bearer secret-key',
          },
          body: JSON.stringify({
            events: [{ type: 'pageview', url: '/test' }],
          }),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
      });

      it('should work without API key when not configured', async () => {
        mockCreateMany.mockResolvedValue({ count: 1 });

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            events: [{ type: 'pageview', url: '/test' }],
          }),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
      });
    });

    describe('pageview events', () => {
      it('should save pageview event', async () => {
        mockCreateMany.mockResolvedValue({ count: 1 });

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            events: [
              {
                type: 'pageview',
                url: '/home',
                title: 'Home Page',
                path: '/home',
                userAgent: 'Mozilla/5.0',
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.received).toBe(1);
        expect(data.saved).toBe(1);
        expect(mockCreateMany).toHaveBeenCalled();
      });

      it('should include screen dimensions', async () => {
        mockCreateMany.mockResolvedValue({ count: 1 });

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            events: [
              {
                type: 'pageview',
                url: '/test',
                screen: { width: 1920, height: 1080 },
                viewport: { width: 1200, height: 800 },
              },
            ],
          }),
        });

        await POST(request);

        expect(mockCreateMany).toHaveBeenCalledWith({
          data: expect.arrayContaining([
            expect.objectContaining({
              screenWidth: 1920,
              screenHeight: 1080,
              viewportWidth: 1200,
              viewportHeight: 800,
            }),
          ]),
        });
      });

      it('should include referrer', async () => {
        mockCreateMany.mockResolvedValue({ count: 1 });

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            events: [
              {
                type: 'pageview',
                url: '/test',
                referrer: 'https://google.com',
              },
            ],
          }),
        });

        await POST(request);

        expect(mockCreateMany).toHaveBeenCalledWith({
          data: expect.arrayContaining([
            expect.objectContaining({
              referrer: 'https://google.com',
            }),
          ]),
        });
      });
    });

    describe('click events', () => {
      it('should save click event', async () => {
        mockCreateMany.mockResolvedValue({ count: 1 });

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            events: [
              {
                type: 'click',
                url: '/test',
                elementType: 'button',
                elementText: 'Click Me',
                elementId: 'submit-btn',
                elementClasses: ['btn', 'btn-primary'],
                clickX: 100,
                clickY: 200,
              },
            ],
          }),
        });

        await POST(request);

        expect(mockCreateMany).toHaveBeenCalledWith({
          data: expect.arrayContaining([
            expect.objectContaining({
              type: 'CLICK',
              elementType: 'button',
              elementText: 'Click Me',
              elementId: 'submit-btn',
              elementClasses: ['btn', 'btn-primary'],
              clickX: 100,
              clickY: 200,
            }),
          ]),
        });
      });

      it('should handle click event with event name', async () => {
        mockCreateMany.mockResolvedValue({ count: 1 });

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            events: [
              {
                type: 'click',
                url: '/test',
                elementType: 'a',
                eventName: 'navigation_click',
              },
            ],
          }),
        });

        await POST(request);

        expect(mockCreateMany).toHaveBeenCalledWith({
          data: expect.arrayContaining([
            expect.objectContaining({
              eventName: 'navigation_click',
            }),
          ]),
        });
      });
    });

    describe('custom events', () => {
      it('should save custom event', async () => {
        mockCreateMany.mockResolvedValue({ count: 1 });

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            events: [
              {
                type: 'custom',
                url: '/test',
                name: 'purchase_completed',
                properties: { amount: 99.99, currency: 'USD' },
              },
            ],
          }),
        });

        await POST(request);

        expect(mockCreateMany).toHaveBeenCalledWith({
          data: expect.arrayContaining([
            expect.objectContaining({
              type: 'CUSTOM',
              customName: 'purchase_completed',
              customProperties: { amount: 99.99, currency: 'USD' },
            }),
          ]),
        });
      });
    });

    describe('batch processing', () => {
      it('should save multiple events', async () => {
        mockCreateMany.mockResolvedValue({ count: 3 });

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            events: [
              { type: 'pageview', url: '/page1' },
              { type: 'click', url: '/page1', elementType: 'button' },
              { type: 'custom', url: '/page1', name: 'event' },
            ],
          }),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(data.received).toBe(3);
        expect(data.saved).toBe(3);
      });

      it('should handle mixed event types', async () => {
        mockCreateMany.mockResolvedValue({ count: 2 });

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            events: [
              {
                type: 'pageview',
                url: '/home',
                title: 'Home',
              },
              {
                type: 'click',
                url: '/home',
                elementType: 'button',
                elementText: 'Sign Up',
              },
            ],
          }),
        });

        await POST(request);

        const callArgs = mockCreateMany.mock.calls[0]?.[0];
        expect(callArgs?.data).toHaveLength(2);
        expect(callArgs?.data[0]).toHaveProperty('pageTitle');
        expect(callArgs?.data[1]).toHaveProperty('elementType');
      });
    });

    describe('error handling', () => {
      it('should handle database errors', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        mockCreateMany.mockRejectedValue(new Error('Database connection failed'));

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            events: [{ type: 'pageview', url: '/test' }],
          }),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.error).toBe('Internal server error');
        expect(data.message).toBe('Database connection failed');
        expect(consoleErrorSpy).toHaveBeenCalled();

        consoleErrorSpy.mockRestore();
      });

      it('should handle invalid JSON', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        const request = new NextRequest('http://localhost:3000/api/analytics', {
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
    });

    describe('data transformation', () => {
      it('should uppercase event type', async () => {
        mockCreateMany.mockResolvedValue({ count: 1 });

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            events: [{ type: 'pageview', url: '/test' }],
          }),
        });

        await POST(request);

        expect(mockCreateMany).toHaveBeenCalledWith({
          data: expect.arrayContaining([
            expect.objectContaining({
              type: 'PAGEVIEW',
            }),
          ]),
        });
      });

      it('should use current timestamp if not provided', async () => {
        mockCreateMany.mockResolvedValue({ count: 1 });

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            events: [{ type: 'pageview', url: '/test' }],
          }),
        });

        await POST(request);

        const callArgs = mockCreateMany.mock.calls[0]?.[0];
        expect(callArgs?.data[0]?.timestamp).toBeInstanceOf(Date);
      });

      it('should handle missing optional fields', async () => {
        mockCreateMany.mockResolvedValue({ count: 1 });

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            events: [
              {
                type: 'pageview',
                url: '/test',
              },
            ],
          }),
        });

        await POST(request);

        expect(mockCreateMany).toHaveBeenCalledWith({
          data: expect.arrayContaining([
            expect.objectContaining({
              referrer: null,
              metadata: null,
            }),
          ]),
        });
      });

      it('should include metadata when provided', async () => {
        mockCreateMany.mockResolvedValue({ count: 1 });

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            events: [
              {
                type: 'pageview',
                url: '/test',
                metadata: { sessionId: 'abc123', userId: 'user-1' },
              },
            ],
          }),
        });

        await POST(request);

        expect(mockCreateMany).toHaveBeenCalledWith({
          data: expect.arrayContaining([
            expect.objectContaining({
              metadata: { sessionId: 'abc123', userId: 'user-1' },
            }),
          ]),
        });
      });

      it('should handle empty elementClasses array', async () => {
        mockCreateMany.mockResolvedValue({ count: 1 });

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            events: [
              {
                type: 'click',
                url: '/test',
                elementType: 'button',
              },
            ],
          }),
        });

        await POST(request);

        expect(mockCreateMany).toHaveBeenCalledWith({
          data: expect.arrayContaining([
            expect.objectContaining({
              elementClasses: [],
            }),
          ]),
        });
      });
    });

    describe('logging', () => {
      it('should log received batch', async () => {
        const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        mockCreateMany.mockResolvedValue({ count: 2 });

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            events: [
              { type: 'pageview', url: '/test1' },
              { type: 'pageview', url: '/test2' },
            ],
          }),
        });

        await POST(request);

        expect(consoleLogSpy).toHaveBeenCalledWith(
          expect.stringContaining('[Analytics API] Received batch'),
          expect.objectContaining({
            count: 2,
          })
        );

        consoleLogSpy.mockRestore();
      });

      it('should log saved events count', async () => {
        const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        mockCreateMany.mockResolvedValue({ count: 1 });

        const request = new NextRequest('http://localhost:3000/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            events: [{ type: 'pageview', url: '/test' }],
          }),
        });

        await POST(request);

        expect(consoleLogSpy).toHaveBeenCalledWith(
          expect.stringContaining('Saved 1 events to database')
        );

        consoleLogSpy.mockRestore();
      });
    });
  });
});
