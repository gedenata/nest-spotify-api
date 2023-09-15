import { Controller, Delete, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AudiobookService } from './audiobook.service';

@Controller('v1')
@ApiTags('Audiobooks')
export class AudiobookController {
  constructor(private readonly audiobookService: AudiobookService) {}

  @Get('audiobooks/:id')
  async getAudiobook() {}

  @Get('audiobooks')
  async getSeveralAudiobooks() {}

  @Get('audiobooks/:id/chapters')
  async getAudiobookChapters() {}

  @Get('me/audiobooks')
  async getUserSavedAudiobooks() {}

  @Put('me/audiobooks')
  async saveAudiobooksForCurrentUser() {}

  @Delete('me/audiobooks')
  async removeUserSavedAudiobooks() {}

  @Get('me/audiobooks/contains')
  async checkUserSavedAudiobooks() {}
}
