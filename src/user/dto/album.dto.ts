import { ApiProperty } from '@nestjs/swagger';
import { RestrictionsDto } from './restrictions.dto';
import { ExternalUrlsDto } from './external-urls.dto';
import { ImageObjectDto } from './image-object.dto';
import { SimplifiedArtistObjectDto } from './simplified-artist-object.dto';

export class AlbumDto {
  @ApiProperty({
    description: 'The type of the album.',
    enum: ['album', 'single', 'compilation'],
    example: 'compilation',
  })
  album_type: string;

  @ApiProperty({
    description: 'The number of tracks in the album',
  })
  total_tracks: number;

  @ApiProperty({
    description:
      'The markets in which the album is available: ISO 3166-1 alpha-2 country codes.',
    type: [String],
    example: ['CA', 'BR', 'IT'],
  })
  available_markets: string[];

  @ApiProperty({
    description: 'Known external URLs for this object, e.g., Spotify URL.',
  })
  external_urls: ExternalUrlsDto;

  @ApiProperty({
    description:
      'A link to the Web API endpoint providing full details of the album.',
  })
  href: string;

  @ApiProperty({
    description: 'The Spotify ID for the album.',
    example: '2up3OPMp9Tb4dAKM2erWXQ',
  })
  id: string;

  @ApiProperty({
    description: 'Images of the artist in various sizes, widest first.',
  })
  images: ImageObjectDto[];

  @ApiProperty({
    description:
      'The name of the album. In case of an album takedown, the value may be an empty string.',
  })
  name: string;

  @ApiProperty({
    description: 'The date the album was first released.',
    example: '1981-12',
  })
  release_date: string;

  @ApiProperty({
    description: 'The precision with which release_date value is known',
    enum: ['year', 'month', 'day'],
  })
  release_date_precision: string;

  @ApiProperty({
    description:
      'Included in the response when a content restriction ia applied.',
  })
  restrictions: RestrictionsDto;

  @ApiProperty({
    description: 'The object type.',
    enum: ['album'],
  })
  type: string;

  @ApiProperty({
    example: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
    description: 'The Spotify URI for the album.',
  })
  uri: string;

  @ApiProperty({
    description:
      'The artist of the album. Each artist object includes a link in href to more detailed information about the artist.',
  })
  artists: SimplifiedArtistObjectDto[];
}
