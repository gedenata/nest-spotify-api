import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArtistService } from './artist.service';

@Controller('v1')
@ApiTags('Artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get('artists/:id')
  async getArtists() {}

  @Get('artists')
  async getSeveralArtists() {}

  @Get('artists/:id/albums')
  async getArtistAlbums() {}

  @Get('artists/:id/top-tracks')
  async getArtistTopTrack() {}

  @Get('artists/:id/related-artists')
  async getArtistRelatedArtist() {}
}
