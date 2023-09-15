import { Controller, Delete, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EpisodeService } from './episode.service';

@Controller('v1')
@ApiTags('Episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get('episodes/:id')
  async getEpisode() {}

  @Get('episodes')
  async getSeveralEpisodes() {}

  @Get('me/episodes')
  async getUserSavedEpisodes() {}

  @Put('me/episodes')
  async saveEpisodesForCurrentUser() {}

  @Delete('me/episodes')
  async removeUserSavedEpisodes() {}

  @Get('me/episodes/contains')
  async checkUserSavedEpisodes() {}
}
