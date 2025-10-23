import type { FastifyInstance } from 'fastify';
import prisma from '../lib/prisma.js';

export default async function healthRoutes(app: FastifyInstance) {
  // Basic health check
  app.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  });

  // Readiness check (includes database connection)
  app.get('/health/ready', async (request, reply) => {
    try {
      // Check database connection
      await prisma.$queryRaw`SELECT 1`;

      return {
        status: 'ready',
        timestamp: new Date().toISOString(),
        database: 'connected',
      };
    } catch (error) {
      reply.status(503).send({
        status: 'not ready',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });
}
