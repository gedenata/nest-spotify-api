import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SpotifyService } from './spotify/spotify.service';
import { AuthService } from './auth/auth.service';
import { SpotifyModule } from './spotify/spotify.module';
import { SpotifyAuthController } from './spotify/spotify-auth.controller';
import { SpotifyAuthService } from './spotify/spotify-auth.service';
import { UserModule } from './api/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './api/user/repository/user.repository';
import { UserService } from './api/user/user.service';
import { UserEntity } from './api/user/entity/user.entity';
import { UserController } from './api/user/user.controller';
import { APP_FILTER } from '@nestjs/core';
import { BadTokenFilter } from './common/filters/bad-token.filter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { AlbumModule } from './api/album/album.module';
import { ArtistController } from './api/artist/artist.controller';
import { ArtistService } from './api/artist/artist.service';
import { ArtistModule } from './api/artist/artist.module';
import { AudiobookModule } from './api/audiobook/audiobook.module';
import { CategoryService } from './api/category/category.service';
import { CategoryModule } from './api/category/category.module';
import { ChapterController } from './api/chapter/chapter.controller';
import { ChapterModule } from './api/chapter/chapter.module';
import { GenreService } from './api/genre/genre.service';
import { GenreController } from './api/genre/genre.controller';
import { GenreModule } from './api/genre/genre.module';
import { MarketModule } from './api/market/market.module';
import { PlayerService } from './api/player/player.service';
import { PlayerController } from './api/player/player.controller';
import { PlayerModule } from './api/player/player.module';
import { PlaylistModule } from './api/playlist/playlist.module';
import { SearchController } from './api/search/search.controller';
import { SearchService } from './api/search/search.service';
import { SearchModule } from './api/search/search.module';
import { TrackModule } from './api/track/track.module';

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
    ArtistModule,
    AudiobookModule,
    CategoryModule,
    ChapterModule,
    GenreModule,
    MarketModule,
    PlayerModule,
    PlaylistModule,
    SearchModule,
    TrackModule,
  ],
  controllers: [
    SpotifyAuthController,
    UserController,
    ArtistController,
    ChapterController,
    GenreController,
    PlayerController,
    SearchController,
  ],
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
    ArtistService,
    CategoryService,
    GenreService,
    PlayerService,
    SearchService,
  ],
})
export class AppModule {}
