import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class FollowPlaylistDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The Spotify ID of the playlist.',
    example: '3cEYpjA9oz9GiPac4AsH4n',
  })
  playlist_id: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Specifies whether the playlist is public or private.',
    example: true,
    default: true,
  })
  public: boolean;
}
