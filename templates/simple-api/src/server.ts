import { buildApp } from './app.js';
import { env, envUtils } from './lib/env.js';

async function start() {
  try {
    const app = await buildApp();

    await app.listen({ port: env.PORT, host: env.HOST });

    console.log(`🚀 Simple API server running on ${envUtils.getServerUrl()}`);
    console.log(`📚 Health check: ${envUtils.getServerUrl()}/health`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

start();
