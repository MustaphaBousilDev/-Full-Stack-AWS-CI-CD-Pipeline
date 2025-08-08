/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const port = configService.get('PORT', 8000);
  const nodeEnv = configService.get('NODE_ENV', 'development');

  // Enable CORS
  app.enableCors({
    origin: configService.get('FRONTEND_URL', 'http://localhost:3000'),
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger documentation
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('AWS CI/CD Pipeline API')
      .setDescription('Full-Stack Application with Enterprise DevOps Practices')
      .setVersion('1.0.0')
      .addTag('health', 'Health check endpoints')
      .addTag('app', 'Application endpoints')
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully...');
    await app.close();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully...');
    await app.close();
    process.exit(0);
  });

  await app.listen(port);
  
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📖 Environment: ${nodeEnv}`);
  console.log(`🔗 Health check: http://localhost:${port}/api/v1/health`);
  console.log(`📊 Stats: http://localhost:${port}/api/v1/stats`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();