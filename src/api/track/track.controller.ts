import { Controller, Delete, Get, Put } from '@nestjs/common';
import { TrackService } from './track.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('v1')
@ApiTags('Tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get('tracks/:id')
  async getTrack() {}

  @Get('tracks')
  async getSeveralTracks() {}

  @Get('me/tracks')
  async getUserSavedTracks() {}

  @Put('me/tracks')
  async saveTracksForCurrentUser() {}

  @Delete('me/tracks')
  async removeUserSavedTracks() {}

  @Get('me/tracks/contains')
  async checkUserSavedTracks() {}

  @Get('audio-features')
  async getTracksAudioFeatures() {}

  @Get('audio-features/:id')
  async getTrackAudioFeatures() {}

  @Get('audio-analysis/:id')
  async getTrackAudioAnalysis() {}

  @Get('recommendations')
  async getRecommendations() {}
}
