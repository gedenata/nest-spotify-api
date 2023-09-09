import { ApiProperty } from '@nestjs/swagger';
import { ExternalUrlsDto } from './external-urls.dto';
import { ImageObjectDto } from './image-object.dto';

export class ArtistObjectDto {
  @ApiProperty({
    description: 'Known external URLs for this object, e.g., Spotify URL.',
  })
  external_urls: ExternalUrlsDto;

  @ApiProperty({
    description: 'Information about the followers of the artist.',
  })
  followers: Followers;

  @ApiProperty({
    description:
      'A list of genres the artist is associated with (empty if not classified).',
    type: [String],
    example: ['Prog rock', 'Grunge'],
  })
  genres: string[];

  @ApiProperty({
    description:
      'A link to the Web API endpoint providing full details of the artist.',
  })
  href: string;

  @ApiProperty({ description: 'The Spotify ID for the artist.' })
  id: string;

  @ApiProperty({
    description: 'The cover art for the album in various sizes, widest first.',
  })
  images: ImageObjectDto[];

  @ApiProperty({ description: 'The name of the artist.' })
  name: string;

  @ApiProperty({ description: 'The popularity of the artist (0-100).' })
  popularity: number;

  @ApiProperty({ description: 'The object type (artist).', enum: ['artist'] })
  type: 'artist';

  @ApiProperty({ description: 'The Spotify URI for the artist.' })
  uri: string;
}

export class Followers {
  @ApiProperty({
    description:
      'Href to the followers (null as Web API does not support it at the moment).',
    nullable: true,
  })
  href: string | null;

  @ApiProperty({ description: 'The total number of followers.' })
  total: number;
}
