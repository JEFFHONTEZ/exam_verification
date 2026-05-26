import { NestFactory } from '@nestjs/core';
import {
  ValidationPipe,
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { AppModule } from './app.module';

// Helper function to convert camelCase to snake_case
function camelToSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

// Recursive function to transform object keys from camelCase to snake_case
function transformKeys(obj: any): any {
  if (obj === null || obj === undefined) return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => transformKeys(item));
  }

  if (typeof obj === 'object' && obj.constructor === Object) {
    const transformed: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const snakeKey = camelToSnakeCase(key);
      transformed[snakeKey] = transformKeys(value);
    }
    return transformed;
  }

  return obj;
}

// Custom pipe to transform request body from camelCase to snake_case
@Injectable()
class CamelToSnakePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' && typeof value === 'object') {
      const transformed = transformKeys(value);
      console.log(
        '[CamelToSnakePipe] Original keys:',
        Object.keys(value || {}),
      );
      console.log(
        '[CamelToSnakePipe] Transformed keys:',
        Object.keys(transformed || {}),
      );
      return transformed;
    }
    return value;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add the camelCase to snake_case transformation pipe FIRST
  app.useGlobalPipes(new CamelToSnakePipe());

  // Then add the validation pipe
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
