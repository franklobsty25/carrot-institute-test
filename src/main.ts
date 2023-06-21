import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));
  
  const configureService = app.get(ConfigService)
  const port = configureService.get('PORT');
 
  await app.listen(parseInt(port) || 3000);

  Logger.log(`Server running on ${await app.getUrl()}`);
  
}
bootstrap();
