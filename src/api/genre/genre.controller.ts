import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GenreService } from './genre.service';

@Controller('v1')
@ApiTags('Genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get('/recommendations/available-genre-seeds')
  async getAvailableGenreSeeds() {}
}
