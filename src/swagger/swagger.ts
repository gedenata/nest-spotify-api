import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

export function setupSwagger(app: NestExpressApplication): void {
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
}
