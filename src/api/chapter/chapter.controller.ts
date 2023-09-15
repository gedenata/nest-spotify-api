import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChapterService } from './chapter.service';

@Controller('v1')
@ApiTags('Chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Get('chapters/:id')
  async getChapter() {}

  @Get('chapters')
  async getSeveralChapters() {}
}
