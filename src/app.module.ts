import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SpotifyService } from './spotify/spotify.service';
import { AuthService } from './auth/auth.service';
import { SpotifyModule } from './spotify/spotify.module';
import { SpotifyAuthController } from './spotify/spotify-auth.controller';
import { SpotifyAuthService } from './spotify/spotify-auth.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user/repository/user.repository';
import { UserService } from './user/user.service';
import { UserEntity } from './user/entity/user.entity';
import { UserController } from './user/user.controller';
import { APP_FILTER } from '@nestjs/core';
import { BadTokenFilter } from './common/filters/bad-token.filter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { AlbumModule } from './album/album.module';

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
    TypeOrmModule.forFeature([UserEntity, UserRepository]),
    HttpModule,
    SpotifyModule,
    UserModule,
    AuthModule,
    AlbumModule,
  ],
  controllers: [SpotifyAuthController, UserController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: BadTokenFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ThrottlerGuard,
    },
    AuthService,
    SpotifyService,
    SpotifyAuthService,
    UserService,
    UserRepository,
  ],
})
export class AppModule {}
