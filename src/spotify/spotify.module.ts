import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SpotifyService } from './spotify.service';
import { SpotifyController } from './spotify.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [HttpModule],
  controllers: [SpotifyController],
  providers: [SpotifyService, AuthService],
})
export class SpotifyModule {}
