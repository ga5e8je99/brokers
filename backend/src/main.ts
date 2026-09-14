import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Global Prefix
  app.setGlobalPrefix('api');

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global Interceptors and Filters
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  // Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  // Swagger Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('FXENGIN Brokers & Agency API')
    .setDescription(
      'Complete Backend API for FXENGIN Brokers platform, Admin Dashboard, Partner API Integrations, and Agency IB Account Verification.',
    )
    .setVersion('1.0.0')
    .addTag('Brokers (Public)', 'Public endpoints for broker listings and details')
    .addTag('VIP Verification (Public)', 'Trader VIP activation requests and status')
    .addTag('Admin Panel', 'Broker CRUD, partner API credentials, dashboard links, and agency check controls')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'FXENGIN Brokers API Docs',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`🚀 FXENGIN Brokers Backend is running on: http://localhost:${port}/api`);
  logger.log(`📚 Interactive Swagger API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
