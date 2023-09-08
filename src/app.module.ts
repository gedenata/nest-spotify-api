import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpotifyService } from './spotify/spotify.service';
import { AuthService } from './auth/auth.service';
import { SpotifyModule } from './spotify/spotify.module';
import { SpotifyAuthController } from './spotify/spotify-auth.controller';
import { SpotifyAuthService } from './spotify/spotify-auth.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user/user.repository';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { UserController } from './user/user.controller';
import { APP_FILTER } from '@nestjs/core';
import { BadTokenFilter } from './common/filters/bad-token.filter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity.js'], // Adjust the path to your entity files
      migrations: ['dist/migrations/*.js'], // Adjust the path to your migration files
      autoLoadEntities: true,
      migrationsRun: true,
    }),
    TypeOrmModule.forFeature([User, UserRepository]),
    HttpModule,
    SpotifyModule,
    UserModule,
  ],
  controllers: [AppController, SpotifyAuthController, UserController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: BadTokenFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ThrottlerGuard,
    },
    AppService,
    AuthService,
    SpotifyService,
    SpotifyAuthService,
    UserService,
    UserRepository,
  ],
})
export class AppModule {}
