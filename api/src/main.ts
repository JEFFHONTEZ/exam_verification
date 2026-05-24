import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Allow the frontend origin in production, but be permissive in development
  if (process.env.NODE_ENV === 'production') {
    app.enableCors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true,
    });
  } else {
    // In development accept the request origin dynamically to avoid CORS issues
    app.enableCors({
      origin: true,
      credentials: true,
    });
  }

  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`\n🚀 API running at http://localhost:${port}/api\n`);
}
bootstrap();
