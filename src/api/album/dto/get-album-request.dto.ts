import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetAlbumRequestDto {
  @ApiProperty({
    description: 'The Spotify ID of the album.',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'An ISO 3166-1 alpha-2 country code.',
    required: false,
  })
  @IsOptional()
  @IsString()
  market?: string;
}
