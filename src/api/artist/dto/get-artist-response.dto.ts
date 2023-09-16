import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class GetArtistResponseDto {
  @ApiProperty({
    description:
      'A link to the Web API endpoint returning the full result of the request.',
  })
  @IsNotEmpty()
  @IsString()
  href: string;

  @ApiProperty({
    description:
      'The maximum number of items in the response (as set in the query or by default).',
  })
  @IsNotEmpty()
  @IsInt()
  limit: number;

  @ApiProperty({
    description: 'URL to the next page of items.',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  next?: string;

  @ApiProperty({
    description:
      'The offset of the items returned (as set in the query or by default).',
  })
  @IsNotEmpty()
  @IsInt()
  offset: number;

  @ApiProperty({
    description: 'URL to the previous page of items.',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  previous?: string;

  @ApiProperty({
    description: 'The total number of items available to return.',
  })
  @IsNotEmpty()
  @IsInt()
  total: number;

  @ApiProperty()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray()
  items: Items[];
}

class Items {
  @ApiProperty({
    description: 'The type of the album.',
    enum: ['album', 'single', 'compilation'],
  })
  @IsNotEmpty()
  @IsString()
  album_type: string;

  @ApiProperty({
    description: 'The number of tracks in the album.',
  })
  @IsNotEmpty()
  @IsInt()
  total_tracks: number;

  @ApiProperty({
    description:
      'The markets in which the album is available: ISO 3166-1 alpha-2 country codes.',
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  available_markets: string[];

  @ApiProperty({
    description: 'Known external URLs for this album.',
  })
  @IsNotEmpty()
  @IsObject()
  external_urls: ExternalUrls;

  @ApiProperty({
    description:
      'A link to the Web API endpoint providing full details of the album.',
  })
  @IsNotEmpty()
  @IsString()
  href: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  album_id: string;

  @ApiProperty({
    description: 'The cover art for the album in various sizes.',
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  images: Images[];

  @ApiProperty({
    description:
      'The name of the album. In case of an album takedown, the value may be an empty string.',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The date the album was first released.',
  })
  @IsNotEmpty()
  @IsString()
  release_date: string;

  @ApiProperty({
    description: 'The precision with which `release_date` value is known.',
  })
  @IsNotEmpty()
  @IsString()
  release_date_precision: string;

  @ApiProperty({
    description:
      'Included in the response when a content restriction is applied.',
  })
  @ValidateNested()
  @IsObject()
  restrictions: Restrictions;

  @ApiProperty({
    description: 'The object type.',
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    description: 'The Spotify URI for the album.',
  })
  @IsNotEmpty()
  @IsString()
  uri: string;

  @ApiProperty({
    description: 'The artists of the album.',
  })
  @ValidateNested()
  @IsNotEmpty()
  @IsArray()
  artists: Artists[];

  @ApiProperty({
    description:
      'This field describes the relationship between the artist and the album.',
  })
  @IsNotEmpty()
  @IsString()
  album_group: string;
}

class Images {
  @ApiProperty({
    description: 'The source URL of the image.',
  })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({
    description: 'The image height in pixels.',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsInt()
  height?: number;

  @ApiProperty({
    description: 'The image width in pixels.',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsInt()
  width?: number;
}

class ExternalUrls {
  @ApiProperty({
    description: 'The Spotify URL for the object.',
  })
  @IsString()
  spotify: string;
}

class Restrictions {
  @ApiProperty({
    description: 'The reason for the restriction.',
  })
  @IsString()
  reason: string;
}

class Artists {
  @ApiProperty({
    description: 'Known external URLs for this artist',
  })
  @IsNotEmpty()
  @IsObject()
  external_urls: ExternalUrls;

  @ApiProperty({
    description:
      'A link to the Web API endpoint providing full details of the artist.',
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
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'The Spotify URI for the artist.',
  })
  @IsString()
  uri: string;
}
