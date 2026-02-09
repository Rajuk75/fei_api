import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './utils/logger';
import { config } from './config/config';

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
  app.enableCors();

  await app.listen(config.PORT);

  // Use Winston logger.info()
  logger.info(`🚀 Fleet Energy Ingestion Server running on port ${config.PORT}`, { context: 'Bootstrap' });
}
bootstrap();



