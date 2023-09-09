import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  IsArray,
  IsUrl,
  IsNumber,
  IsDate,
  IsObject,
} from 'class-validator';
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
  @IsEnum(['album', 'single', 'compilation'])
  album_type: string;

  @ApiProperty({
    description: 'The number of tracks in the album',
  })
  @IsNumber()
  total_tracks: number;

  @ApiProperty({
    description:
      'The markets in which the album is available: ISO 3166-1 alpha-2 country codes.',
    type: [String],
    example: ['CA', 'BR', 'IT'],
  })
  @IsArray()
  @IsString({ each: true })
  available_markets: string[];

  @ApiProperty({
    description: 'Known external URLs for this object, e.g., Spotify URL.',
  })
  @IsObject()
  external_urls: ExternalUrlsDto;

  @ApiProperty({
    description:
      'A link to the Web API endpoint providing full details of the album.',
  })
  @IsUrl()
  href: string;

  @ApiProperty({
    description: 'The Spotify ID for the album.',
    example: '2up3OPMp9Tb4dAKM2erWXQ',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Images of the artist in various sizes, widest first.',
  })
  @IsArray()
  @IsObject({ each: true })
  images: ImageObjectDto[];

  @ApiProperty({
    description:
      'The name of the album. In case of an album takedown, the value may be an empty string.',
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
  restrictions: RestrictionsDto;

  @ApiProperty({
    description: 'The object type.',
    enum: ['album'],
  })
  @IsEnum(['album'])
  type: string;

  @ApiProperty({
    example: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
    description: 'The Spotify URI for the album.',
  })
  @IsString()
  uri: string;

  @ApiProperty({
    description:
      'The artist of the album. Each artist object includes a link in href to more detailed information about the artist.',
  })
  @IsArray()
  @IsObject({ each: true })
  artists: SimplifiedArtistObjectDto[];
}
