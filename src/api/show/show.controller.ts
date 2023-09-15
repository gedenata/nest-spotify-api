import { Controller, Delete, Get, Put } from '@nestjs/common';
import { ShowService } from './show.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('v1')
@ApiTags('Shows')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Get('shows/:id')
  async getShow() {}

  @Get('shows')
  async getSeveralShows() {}

  @Get('shows/:id/episodes')
  async getShowEpisode() {}

  @Get('me/shows')
  async getUserSavedShows() {}

  @Put('me/shows')
  async saveShowsForCurrentUser() {}

  @Delete('me/shows')
  async removeUserSavedShows() {}

  @Get('me/shows/contains')
  async checkUserSavedShows() {}
}
