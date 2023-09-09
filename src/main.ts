import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
    }) as any,
  );

  const config = new DocumentBuilder()
    .setTitle('Spotify Web API')
    .setDescription('Spotify Web API Documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Spotify Web API Docs',
    swaggerOptions: {
      persistAuthorization: true,
      filter: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      defaultModelsExpandDepth: false,
    },
    customCss: `
      #swagger-ui .topbar {
        display: none;
      }
      .swagger-ui .model-box-control:focus,
      .swagger-ui .models-control:focus,
      .swagger-ui .opblock-summary-control:focus {
        outline: none;
      }
    `,
  });

  await app.listen(3000);
}

bootstrap();
