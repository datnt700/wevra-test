import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

// Validation schemas
const eventSchema = z.object({
  type: z.enum(['click', 'pageview', 'custom']),
  timestamp: z.string().datetime(),
  url: z.string().url(),
  referrer: z.string().url().optional().nullable(),
  userAgent: z.string(),
  screen: z
    .object({
      width: z.number().optional(),
      height: z.number().optional(),
    })
    .optional(),
  viewport: z
    .object({
      width: z.number().optional(),
      height: z.number().optional(),
    })
    .optional(),
  metadata: z.record(z.unknown()).optional().nullable(),
  // Click event fields
  elementType: z.string().optional(),
  elementText: z.string().optional(),
  elementId: z.string().optional(),
  elementClasses: z.array(z.string()).optional(),
  clickX: z.number().optional(),
  clickY: z.number().optional(),
  eventName: z.string().optional(),
  // Page view fields
  title: z.string().optional(),
  path: z.string().optional(),
  // Custom event fields
  name: z.string().optional(),
  properties: z.record(z.unknown()).optional(),
});

const batchSchema = z.object({
  events: z.array(eventSchema).min(1).max(100),
});

type EventInput = z.infer<typeof eventSchema>;
type BatchInput = z.infer<typeof batchSchema>;

/**
 * Analytics routes
 */
export async function analyticsRoutes(app: FastifyInstance) {
  // POST /api/events - Receive analytics events in batch
  app.post(
    '/events',
    {
      schema: {
        body: {
          type: 'object',
          required: ['events'],
          properties: {
            events: {
              type: 'array',
              minItems: 1,
              maxItems: 100,
            },
          },
        },
      },
    },
    async (request: FastifyRequest<{ Body: BatchInput }>, reply: FastifyReply) => {
      try {
        // Validate API key if configured
        const apiKey = request.headers.authorization?.replace('Bearer ', '');
        const expectedApiKey = process.env.ANALYTICS_API_KEY;

        if (expectedApiKey && apiKey !== expectedApiKey) {
          return reply.status(401).send({
            error: 'Unauthorized',
            message: 'Invalid or missing API key',
          });
        }

        // Validate request body
        const validation = batchSchema.safeParse(request.body);
        if (!validation.success) {
          return reply.status(400).send({
            error: 'Validation Error',
            message: 'Invalid event data',
            details: validation.error.format(),
          });
        }

        const { events } = validation.data;

        // Transform and save events to database
        const dbEvents = events.map((event: EventInput) => {
          const baseEvent = {
            type: event.type.toUpperCase() as 'CLICK' | 'PAGEVIEW' | 'CUSTOM',
            timestamp: new Date(event.timestamp),
            url: event.url,
            referrer: event.referrer || null,
            userAgent: event.userAgent,
            screenWidth: event.screen?.width,
            screenHeight: event.screen?.height,
            viewportWidth: event.viewport?.width,
            viewportHeight: event.viewport?.height,
            metadata: event.metadata || undefined,
          };

          // Add type-specific fields
          if (event.type === 'click') {
            return {
              ...baseEvent,
              elementType: event.elementType,
              elementText: event.elementText,
              elementId: event.elementId,
              elementClasses: event.elementClasses || [],
              clickX: event.clickX,
              clickY: event.clickY,
              eventName: event.eventName,
            };
          } else if (event.type === 'pageview') {
            return {
              ...baseEvent,
              pageTitle: event.title,
              pagePath: event.path,
            };
          } else if (event.type === 'custom') {
            return {
              ...baseEvent,
              customName: event.name,
              customProperties: event.properties || undefined,
            };
          }

          return baseEvent;
        });

        // Save to database
        await app.prisma.analyticsEvent.createMany({
          data: dbEvents as any,
        });

        app.log.info(`✅ Saved ${dbEvents.length} analytics events`);

        return reply.send({
          success: true,
          received: events.length,
          saved: dbEvents.length,
          message: 'Events saved successfully',
        });
      } catch (error) {
        app.log.error({ error }, 'Error saving analytics events:');

        return reply.status(500).send({
          error: 'Internal Server Error',
          message: error instanceof Error ? error.message : 'Failed to save events',
        });
      }
    }
  );

  // GET /api/stats - Get basic statistics (optional, for testing)
  app.get('/stats', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const [totalEvents, clickEvents, pageviewEvents, customEvents] = await Promise.all([
        app.prisma.analyticsEvent.count(),
        app.prisma.analyticsEvent.count({ where: { type: 'CLICK' } }),
        app.prisma.analyticsEvent.count({ where: { type: 'PAGEVIEW' } }),
        app.prisma.analyticsEvent.count({ where: { type: 'CUSTOM' } }),
      ]);

      return reply.send({
        totalEvents,
        eventsByType: {
          click: clickEvents,
          pageview: pageviewEvents,
          custom: customEvents,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      app.log.error({ error }, 'Error fetching stats:');

      return reply.status(500).send({
        error: 'Internal Server Error',
        message: 'Failed to fetch statistics',
      });
    }
  });
}
