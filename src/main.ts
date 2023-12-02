import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalSerializerInterceptor } from './common/interceptors/global-serializer.interceptor';
import { GlobalExceptionsFilter } from './common/filters/global-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Initialize Global Configurations
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new GlobalSerializerInterceptor());
  app.useGlobalFilters(new GlobalExceptionsFilter());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
