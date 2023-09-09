import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ExternalUrlsDto } from './external-urls.dto';
import { ImageObjectDto } from './image-object.dto';
import { FollowersDto } from './followers.dto';

export class ArtistObjectDto {
  @ApiProperty({
    description: 'Known external URLs for this object, e.g., Spotify URL.',
  })
  @IsObject()
  external_urls: ExternalUrlsDto;

  @ApiProperty({
    description: 'Information about the followers of the artist.',
  })
  @ValidateNested()
  followers: FollowersDto;

  @ApiProperty({
    description:
      'A list of genres the artist is associated with (empty if not classified).',
    type: [String],
    example: ['Prog rock', 'Grunge'],
  })
  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @ApiProperty({
    description:
      'A link to the Web API endpoint providing full details of the artist.',
  })
  @IsString()
  href: string;

  @ApiProperty({ description: 'The Spotify ID for the artist.' })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The cover art for the album in various sizes, widest first.',
  })
  @IsArray()
  @IsObject({ each: true })
  images: ImageObjectDto[];

  @ApiProperty({ description: 'The name of the artist.' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The popularity of the artist (0-100).' })
  @IsNumber()
  popularity: number;

  @ApiProperty({ description: 'The object type (artist).', enum: ['artist'] })
  @IsEnum(['artist'])
  type: 'artist';

  @ApiProperty({ description: 'The Spotify URI for the artist.' })
  @IsString()
  uri: string;
}
