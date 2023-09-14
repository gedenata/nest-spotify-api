import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class ExternalUrls {
  @ApiProperty({
    description: 'The Spotify URL for the object.',
  })
  @IsString()
  spotify: string;
}

class Images {
  @ApiProperty({
    description: 'The source URL of the image.',
    example: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
  })
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'The image height in pixels.',
    example: 300,
  })
  @IsInt()
  @IsNotEmpty()
  height: number | null;

  @ApiProperty({
    description: 'The image weight in pixels.',
    example: 300,
  })
  @IsInt()
  @IsNotEmpty()
  width: number | null;
}

class Restrictions {
  @ApiProperty({
    description:
      "The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content. Additional reasons may be added in the future.",
    enum: ['market', 'product', 'explicit'],
  })
  @IsEnum(['market', 'product', 'explicit'])
  @IsString()
  reason: string;
}

class Artist {
  @ApiProperty({
    description: 'Known external URLs for this artist.',
  })
  @ValidateNested()
  external_urls: ExternalUrls;

  @ApiProperty({
    description:
      'A link to the Web API endpoint returning the full result of the request.',
  })
  @IsString()
  href: string;

  @ApiProperty({
    description: 'The Spotify ID for the artist.',
  })
  @IsString()
  artist_id: string;

  @ApiProperty({
    description: 'The name of the artist.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The object type.',
    example: 'artist',
  })
  @IsString()
  @IsIn(['artist'])
  type: string;

  @ApiProperty({
    description: 'The Spotify URI for the artist.',
    example: 'spotify:artists:XXXXXX',
  })
  @IsString()
  uri: string;
}

class LinkedFrom {
  @ApiProperty({
    description: 'Known external URLs for this album.',
  })
  @ValidateNested()
  @IsObject()
  external_urls: ExternalUrls;

  @ApiProperty({
    description:
      'A link to the Web API endpoint providing full details of the track.',
  })
  @IsString()
  href: string;

  @ApiProperty({
    description: 'The Spotify ID for the track.',
  })
  @IsString()
  track_id: string;

  @ApiProperty({
    description: 'The object type: "track".',
    enum: ['track'],
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'The Spotify URI for the track.',
  })
  @IsUrl()
  url: string;
}

class Tracks {
  @ApiProperty({
    description:
      'A link to the Web API endpoint returning the full result of the request.',
  })
  @IsString()
  href: string;

  @ApiProperty({
    description:
      'The maximum number of items in the response (as set the query or by default.)',
  })
  @Min(1)
  @IsInt()
  limit: number;

  @ApiProperty({
    description: 'URL to the next page of items. (`null` if none)',
  })
  @IsOptional()
  @IsUrl()
  @IsString()
  next: string;

  @ApiProperty({
    description: 'The index of the first item to return',
    minimum: 0,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  offset: number;

  @ApiProperty({
    description: 'URL to the previous page of items (nullable)',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  previous?: string;

  @ApiProperty({
    description: 'The total number of items available to return',
    example: 4,
    type: Number,
  })
  @IsInt()
  total: number;

  @ApiProperty({
    description: '',
  })
  @ValidateNested()
  @IsObject()
  items: Items[];
}

class Items {
  @ApiProperty({
    description: 'The artists who performed the track.',
  })
  @ValidateNested()
  @IsObject()
  artist: Artist;

  @ApiProperty({
    description:
      'A list of the countries in which the track can be played, identified by their ISO 3166-1 alpha-2 code.',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  available_markets: string[];

  @ApiProperty({
    description:
      'The disc number (usually 1 unless the album consists of more than one disc).',
  })
  @IsInt()
  disc_number: number;

  @ApiProperty({
    description: 'The track length in milliseconds.',
  })
  @IsInt()
  duration_ms: number;

  @ApiProperty({
    description:
      'Whether or not the track has explicit lyrics ( true = yes it does; false = no it does not OR unknown).',
  })
  @IsBoolean()
  explicit: boolean;

  @ApiProperty({
    description: 'Known external URLs for this album.',
  })
  @ValidateNested()
  @IsObject()
  external_urls: ExternalUrls;

  @ApiProperty({
    description:
      'A link to the Web API endpoint providing full details of the album.',
  })
  @IsString()
  href: string;

  @ApiProperty({
    description: 'The Spotify ID for the track.',
  })
  @IsString()
  track_id: string;

  @ApiProperty({
    description:
      'Part of the response when Track Relinking is applied. If true, the track is playable in the given market. Otherwise false.',
  })
  @IsBoolean()
  is_playable: boolean;

  @ApiProperty({
    description:
      'Part of the response when Track Relinking is applied and is only part of the response if the track linking.',
  })
  @ValidateNested()
  @IsObject()
  linked_from: LinkedFrom;

  @ApiProperty({
    description:
      'Included in the response when a content restriction is applied.',
  })
  @ValidateNested()
  restrictions: Restrictions;

  @ApiProperty({
    description: 'The name of the track.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description:
      'A link to a 30-second preview (MP3 format) of the track. Can be null',
  })
  @IsOptional()
  @IsUrl()
  preview_url: string | null;

  @ApiProperty({
    description:
      'The number of the track. If an album has several discs, the track number is the number on the specified disc.',
  })
  @IsNumber()
  track_number: number;

  @ApiProperty({
    description: 'The object type: "track".',
    enum: ['track'],
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'The Spotify URI for the track.',
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    description: 'Whether or not the track is from a local file.',
  })
  @IsBoolean()
  is_local: boolean;
}

class Copyrights {
  @ApiProperty({
    description: 'The copyright text for this content.',
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'The type of copyright.',
  })
  @IsString()
  type: string;
}

class ExternalIds {
  @ApiProperty()
  @IsOptional()
  @IsString()
  isrc?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  ean?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  upc?: string;
}

export class GetAlbumResponseDto {
  @ApiProperty({
    description: 'The type of the album',
  })
  @IsIn(['album', 'single', 'compilation'])
  @IsString()
  album_type: string;

  @ApiProperty({
    description: 'The number of tracks in the album.',
  })
  @IsInt()
  @Min(1)
  total_tracks: number;

  @ApiProperty({
    description:
      'The markets in which the album is available (ISO 3166-1 alpha-2 country codes)',
    example: ['CA', 'BR', 'IT'],
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  available_markets: string[];

  @ApiProperty({
    description: 'Known external URLs for this album.',
  })
  @ValidateNested()
  external_urls: ExternalUrls;

  @ApiProperty({
    description:
      'A link to the Web API endpoint providing full details of the album.',
  })
  @IsString()
  href: string;

  @ApiProperty({
    description: 'The Spotify ID for the album.',
  })
  @IsString()
  album_id: string;

  @ApiProperty({
    description: 'Images of the album in various sizes, widest first.',
  })
  @ValidateNested()
  @IsArray()
  images: Images[];

  @ApiProperty({
    description: 'The name of the album.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The date the album was first released.',
    example: '1981-12',
  })
  @IsDate()
  release_date: string;

  @ApiProperty({
    description: 'The precision with which release_date value is known',
    enum: ['year', 'month', 'day'],
  })
  @IsEnum(['year', 'month', 'day'])
  release_date_precision: string;

  @ApiProperty({
    description:
      'Included in the response when a content restriction is applied.',
  })
  @ValidateNested()
  restrictions: Restrictions;

  @ApiProperty({
    description: 'The object type: "album".',
    enum: ['album'],
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'The Spotify URI for the album.',
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    description: 'The artist of the album.',
  })
  @ValidateNested()
  artist: Artist;

  @ApiProperty({
    description: 'The tracks of the album.',
  })
  @ValidateNested()
  tracks: Tracks;

  @ApiProperty({
    description: 'The copyright text for this content.',
  })
  @ValidateNested()
  copyrights: Copyrights;

  @ApiProperty({
    description: 'Known external IDs for the album.',
  })
  @ValidateNested()
  external_ids: ExternalIds;

  @ApiProperty({
    description:
      'A list of the genres the album is associated with. If not yet classified, the array is empty.',
    example: ['Egg punk', 'Noise rock'],
  })
  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @ApiProperty({
    description: 'The label associated with the album.',
  })
  @IsString()
  label: string;

  @ApiProperty({
    description: 'The popularity of the album.',
  })
  @Min(0)
  @Max(100)
  @IsInt()
  popularity: number;
}
