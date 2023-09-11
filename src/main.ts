import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
    }) as any,
  );

  setupSwagger(app);

  await app.listen(3000);
}

bootstrap();
