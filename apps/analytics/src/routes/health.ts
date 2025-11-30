import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * Health check routes
 */
export async function healthRoutes(app: FastifyInstance) {
  // Basic health check
  app.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.send({
      status: 'ok',
      service: 'Eventure Analytics API',
      version: '0.1.0',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // Detailed health check (includes database)
  app.get('/health/detailed', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Check database connection
      await app.prisma.$queryRaw`SELECT 1`;

      return reply.send({
        status: 'ok',
        service: 'Eventure Analytics API',
        version: '0.1.0',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: {
          status: 'connected',
          type: 'PostgreSQL',
        },
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
          unit: 'MB',
        },
      });
    } catch (error) {
      return reply.status(503).send({
        status: 'error',
        service: 'Eventure Analytics API',
        timestamp: new Date().toISOString(),
        database: {
          status: 'disconnected',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    }
  });
}
