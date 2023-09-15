import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { GetAlbumResponseDto } from './dto/get-album-response.dto';
import { ErrorResponseDto } from 'src/shared/dto/error-response.dto';

@Controller('v1')
@ApiTags('Albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get('albums/:id')
  async getAlbum(
    @Param('album_id') album_id: string,
    @Param('market') market?: string,
  ): Promise<GetAlbumResponseDto> {
    try {
      const album = await this.albumService.getAlbum(album_id, market);
      return album;
    } catch (error) {
      // Handle UnauthorizedException
      if (error.response) {
        const { status, data } = error.response;
        throw new HttpException(data, status);
      } else {
        // Handle network errors or unexpected issues
        const errorResponse: ErrorResponseDto = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error',
        };
        throw new HttpException(
          errorResponse,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get('albums')
  async getSeveralAlbums() {}

  @Get('albums/:id/tracks')
  async getAlbumTracks() {}

  @Get('me/albums')
  async getUserSavedAlbums() {}

  @Put('me/albums')
  async saveAlbumsForCurrentUser() {}

  @Delete('me/albums')
  async removeUserSavedAlbums() {}

  @Get('me/albums/contains')
  async checkUserSavedAlbums() {}

  @Get('browse/new-releases')
  async getNewReleases() {}
}
