import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth/auth.service';
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
import { CategoryController } from './api/category/category.controller';
import { ShowModule } from './api/show/show.module';
import { ShowController } from './api/show/show.controller';
import { ShowService } from './api/show/show.service';
import { ChapterService } from './api/chapter/chapter.service';
import { AudiobookService } from './api/audiobook/audiobook.service';
import { AudiobookController } from './api/audiobook/audiobook.controller';
import { EpisodeService } from './api/episode/episode.service';
import { MarketService } from './api/market/market.service';
import { PlaylistService } from './api/playlist/playlist.service';
import { TrackService } from './api/track/track.service';
import { AlbumService } from './api/album/album.service';
import { AlbumController } from './api/album/album.controller';
import { TrackController } from './api/track/track.controller';
import { PlaylistController } from './api/playlist/playlist.controller';
import { MarketController } from './api/market/market.controller';
import { EpisodeController } from './api/episode/episode.controller';
import { EpisodeModule } from './api/episode/episode.module';

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
    AuthModule,
    AlbumModule,
    ArtistModule,
    AudiobookModule,
    CategoryModule,
    ChapterModule,
    EpisodeModule,
    GenreModule,
    MarketModule,
    PlayerModule,
    PlaylistModule,
    SearchModule,
    ShowModule,
    TrackModule,
    UserModule,
  ],
  controllers: [
    AlbumController,
    ArtistController,
    AudiobookController,
    CategoryController,
    ChapterController,
    EpisodeController,
    GenreController,
    MarketController,
    PlayerController,
    PlaylistController,
    SearchController,
    ShowController,
    TrackController,
    UserController,
  ],
  providers: [
    UserRepository,
    {
      provide: APP_FILTER,
      useClass: BadTokenFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ThrottlerGuard,
    },
    AuthService,
    AlbumService,
    ArtistService,
    AudiobookService,
    CategoryService,
    ChapterService,
    EpisodeService,
    GenreService,
    MarketService,
    PlayerService,
    PlaylistService,
    SearchService,
    ShowService,
    TrackService,
    UserService,
  ],
})
export class AppModule {}
