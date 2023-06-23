import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const configureService = app.get(ConfigService);
  const port = configureService.get('PORT');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Food Delivery Platform API')
    .setDescription('API for Food Delivery Platform')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  const options = {
    swaggerOptions: {
      tagsSorter: 'alpha',
      sortSchemas: 'alpha',
      authAction: {
        defaultBearerAuth: {
          name: 'defaultBearerAuth',
          schema: {
            description: 'Default',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value: process.env.SWAGGER_TOKEN,
        },
      },
    },
  };

  SwaggerModule.setup('api/docs', app, document, options);

  await app.listen(parseInt(port) || 3000);

  Logger.log(`Server running on ${await app.getUrl()}`);
}
bootstrap();
