import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlaylistService } from './playlist.service';

@Controller('v1')
@ApiTags('Playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get('playlists/:playlist_id')
  async getPlaylist() {}

  @Put('playlists/:playlist_id')
  async changePlaylistDetails() {}

  @Get('playlists/:playlist_id/tracks')
  async getPlaylistItems() {}

  @Put('playlists/:playlist_id/tracks')
  async updatePlaylistItems() {}

  @Post('playlists/:playlist_id/tracks')
  async addItemsToPlaylist() {}

  @Delete('playlists/:playlist_id/tracks')
  async removePlaylistItems() {}

  @Get('me/playlists')
  async getCurrentUserPlaylists() {}

  @Get('users/:user_id/playlists')
  async getUserPlaylists() {}

  @Post('users/:user_id/playlists')
  async createPlaylist() {}

  @Get('browse/featured-playlists')
  async getFeaturedPlaylists() {}

  @Get('browse/categories/:category_id/playlists')
  async getCategoryPlaylists() {}

  @Get('playlists/:playlist_id/images')
  async getPlaylistCoverImages() {}

  @Put('playlists/:playlist_id/images')
  async addCustomPlaylistCoverImage() {}
}
