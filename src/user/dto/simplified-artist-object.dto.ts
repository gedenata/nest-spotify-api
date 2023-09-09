import { ApiProperty } from '@nestjs/swagger';
import { ExternalUrlsDto } from './external-urls.dto';

export class SimplifiedArtistObjectDto {
  @ApiProperty({
    description: 'Known external URLs for this object, e.g., Spotify URL.',
  })
  external_urls: ExternalUrlsDto;

  @ApiProperty({
    description:
      'A link to the Web API endpoint providing full details of the artist.',
  })
  href: string;

  @ApiProperty({ description: 'The Spotify ID for the artist.' })
  id: string;

  @ApiProperty({ description: 'The name of the artist.' })
  name: string;

  @ApiProperty({ description: 'The object type (artist).', enum: ['artist'] })
  type: 'artist';

  @ApiProperty({ description: 'The Spotify URI for the artist.' })
  uri: string;
}
