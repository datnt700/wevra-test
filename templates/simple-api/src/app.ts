import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import healthRoutes from './routes/health.js';
import exampleRoutes from './routes/example.js';
import { env, envUtils } from './lib/env.js';

export async function buildApp(opts = {}) {
  const app = Fastify({
    logger: {
      level: env.LOG_LEVEL,
    },
    ...opts,
  });

  // Security middleware
  await app.register(helmet, {
    contentSecurityPolicy: false,
  });

  await app.register(cors, {
    origin: envUtils.getAllowedOrigins(),
    credentials: true,
  });

  await app.register(rateLimit, {
    max: 100,
    timeWindow: '15 minutes',
  });

  // Routes
  await app.register(healthRoutes);
  await app.register(exampleRoutes, { prefix: '/api' });

  // Error handler
  app.setErrorHandler((error, request, reply) => {
    app.log.error(error);

    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    reply.status(statusCode).send({
      error: {
        message,
        statusCode,
      },
    });
  });

  // Not found handler
  app.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      error: {
        message: 'Route not found',
        statusCode: 404,
      },
    });
  });

  return app;
}
