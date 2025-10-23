import Fastify from 'fastify';
import { buildApp } from './app.js';

const PORT = parseInt(process.env.PORT || '3001', 10);
const HOST = process.env.HOST || '0.0.0.0';

/**
 * Start the Fastify server
 */
async function start() {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
      transport:
        process.env.NODE_ENV === 'development'
          ? {
              target: 'pino-pretty',
              options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
              },
            }
          : undefined,
    },
  });

  try {
    // Build and register the application
    await buildApp(app);

    // Start listening
    await app.listen({ port: PORT, host: HOST });

    console.log(`
🚀 Analytics API Server started successfully!

📊 Service: Tavia Analytics API
🌐 URL: http://localhost:${PORT}
📝 Health: http://localhost:${PORT}/health
📚 Docs: http://localhost:${PORT}/docs (coming soon)
🔍 Environment: ${process.env.NODE_ENV || 'development'}

Ready to receive analytics events! 🎯
    `);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⏳ Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n⏳ Shutting down gracefully...');
  process.exit(0);
});

// Start the server
start();
