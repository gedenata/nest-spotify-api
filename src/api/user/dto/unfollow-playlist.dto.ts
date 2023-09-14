import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UnfollowPlaylistDto {
  @ApiProperty({
    description: 'The Spotify ID of the playlist.',
    example: '3cEYpjA9oz9GiPac4AsH4n',
  })
  @IsNotEmpty()
  @IsString()
  playlist_id: string;
}
