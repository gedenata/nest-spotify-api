import { Controller, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlayerService } from './player.service';

@Controller('v1')
@ApiTags('Players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('me/player')
  async getPlaybackState() {}

  @Put('me/player')
  async transferPlayback() {}

  @Get('me/player/devices')
  async getAvailableDevices() {}

  @Get('me/player/currently-playing')
  async getCurrentlyPlayingTrack() {}

  @Put('me/player/play')
  async startPlayback() {}

  @Put('me/player/pause')
  async pausePlayback() {}

  @Post('me/player/next')
  async skipToNext() {}

  @Post('me/player/previous')
  async skipToPrevious() {}

  @Put('me/player/seek')
  async seekToPosition() {}

  @Put('me/player/repeat')
  async setRepeatMode() {}

  @Put('me/player/volume')
  async setPlaybackVolume() {}

  @Put('me/player/shuffle')
  async togglePlaybackShuffle() {}

  @Get('me/player/recently-played')
  async getRecentlyPlayedTracks() {}

  @Get('me/player/queue')
  async getUserQueue() {}

  @Post('me/player/queue')
  async addItemToPlaybackQueue() {}
}
