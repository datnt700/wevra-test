import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env, envUtils } from './lib/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: envUtils.getAllowedOrigins(),
    credentials: true,
  });

  // Swagger setup (development only)
  if (envUtils.isDevelopment()) {
    const config = new DocumentBuilder()
      .setTitle('Complex API Template')
      .setDescription('Generic NestJS API template for Eventure monorepo')
      .setVersion('0.0.1')
      .addTag('examples')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(env.PORT);

  console.log(`🚀 Complex API server running on ${envUtils.getServerUrl()}`);
  console.log(`📚 Swagger docs: ${envUtils.getServerUrl()}/api`);
  console.log(`💚 Health check: ${envUtils.getServerUrl()}/health`);
}

bootstrap();
