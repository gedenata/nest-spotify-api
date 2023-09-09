import { ApiProperty } from '@nestjs/swagger';
import { ArtistObjectDto } from './artist-object.dto';
import { AlbumDto } from './album.dto';
import { ExternalIdsDto } from './external-ids.dto';
import { ExternalUrlsDto } from './external-urls.dto';
import { RestrictionsDto } from './restrictions.dto';

export class TrackObjectDto {
  @ApiProperty({
    description:
      'The album on which the track appears. The album object includes a link in href to full information about the album.',
  })
  album: AlbumDto;

  @ApiProperty({
    description:
      'The artists who performed the track. Each artist object includes a link in href to more detailed information about the artist.',
  })
  artist: ArtistObjectDto[];

  @ApiProperty({
    description:
      'A list of the countries in which the track can be played, identified by their ISO 3166-1 alpha-2 code.',
  })
  available_markets: string[];

  @ApiProperty({
    description:
      'The disc number (usually 1 unless the album consists of more than one disc).',
  })
  disc_number: number;

  @ApiProperty({
    description: 'The track length in milliseconds.',
  })
  duration_ms: number;

  @ApiProperty({
    description:
      'Whether or not the track has explicit lyrics ( true = yes it does; false = no it does not OR unknown).',
  })
  explicit: boolean;

  @ApiProperty({
    description: 'Known external URLs for this object, e.g., Spotify URL.',
  })
  external_ids: ExternalIdsDto;

  @ApiProperty({
    description: 'Known external IDs for the track.',
  })
  external_urls: ExternalUrlsDto;

  @ApiProperty({
    description:
      'A link to the Web API endpoint providing full details of the track.',
  })
  href: string;

  @ApiProperty({ description: 'The Spotify ID for the track.' })
  id: string;

  @ApiProperty({
    description:
      'Part of the response when Track Relinking is applied. If true, the track is playable in the given market. Otherwise false.',
  })
  is_playable: boolean;

  // This api property actually is object value but not defined. For now we use `any` as current value.
  @ApiProperty({
    description:
      'Part of the response when Track Relinking is applied, and the requested track has been replaced with different track. The track in the linked_from object contains information about the originally requested track.',
  })
  linked_from: any;

  @ApiProperty({
    description:
      'Included in the response when a content restriction is applied.',
  })
  restrictions: RestrictionsDto;

  @ApiProperty({
    description: 'The name of the track.',
  })
  name: string;

  @ApiProperty({
    description:
      'The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.',
    minimum: 0,
    maximum: 100,
  })
  popularity: number;

  @ApiProperty({
    description:
      'A link to a 30 second preview (MP3 format) of the track. Can be null',
    nullable: true,
  })
  preview_url: string | null;

  @ApiProperty({
    description:
      'The number of the track. If an album has several discs, the track number is the number on the specified disc.',
  })
  track_number: number;

  @ApiProperty({
    description: 'The object type: "track".',
    enum: ['track'],
  })
  type: string;

  @ApiProperty({
    description: 'The Spotify URI for the track.',
  })
  url: string;

  @ApiProperty({
    description: 'Whether or not the track is from a local file.',
  })
  is_local: boolean;
}
