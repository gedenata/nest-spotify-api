import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, ValidateNested } from 'class-validator';
import { ExternalUrlsDto } from './external-urls.dto';

export class SimplifiedArtistObjectDto {
  @ApiProperty({
    description: 'Known external URLs for this object, e.g., Spotify URL.',
  })
  @IsString()
  @IsUrl()
  @ValidateNested()
  external_urls: ExternalUrlsDto;

  @ApiProperty({
    description:
      'A link to the Web API endpoint providing full details of the artist.',
  })
  @IsString()
  @IsUrl()
  href: string;

  @ApiProperty({ description: 'The Spotify ID for the artist.' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'The name of the artist.' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The object type (artist).', enum: ['artist'] })
  @IsString()
  type: 'artist';

  @ApiProperty({ description: 'The Spotify URI for the artist.' })
  @IsString()
  @IsUrl()
  uri: string;
}
