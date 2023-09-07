import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpotifyService } from './spotify/spotify.service';
import { AuthService } from './auth/auth.service';
import { SpotifyModule } from './spotify/spotify.module';
import { SpotifyAuthController } from './spotify/spotify-auth.controller';
import { SpotifyAuthService } from './spotify/spotify-auth.service';

@Module({
  imports: [HttpModule, SpotifyModule],
  controllers: [AppController, SpotifyAuthController],
  providers: [AppService, AuthService, SpotifyService, SpotifyAuthService],
})
export class AppModule {}
