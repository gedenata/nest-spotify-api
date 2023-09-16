import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class GetArtistRequestDto {
  @ApiProperty({
    description: 'The Spotify ID of the artist.',
    example: '0TnOYISbd1XYRBk9myaseg',
  })
  @IsNotEmpty()
  @IsString()
  artist_id: string;

  @ApiProperty({
    description:
      'A comma-separated list of keywords that will be used to filter the response.',
  })
  @IsString()
  include_groups: string;

  @ApiProperty({
    description: 'An ISO 3166-1 alpha-2 country code',
  })
  @IsString()
  market: string;

  @ApiProperty({
    description: 'The maximum number of items to return.',
  })
  @Max(50)
  @Min(1)
  @IsInt()
  limit: number;

  @ApiProperty({
    description: 'The index of the first item to return.',
  })
  @IsInt()
  offset: number;
}
