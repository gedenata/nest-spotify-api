import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { SimplifiedArtistObjectDto } from './simplified-artist-object.dto';
import { ExternalUrlsDto } from './external-urls.dto';
import { LinkedFromDto } from './linked-from.dto';
import { RestrictionsDto } from './restrictions.dto';

export class ItemsSimplifiedTrackObjectDto extends IntersectionType(
  SimplifiedArtistObjectDto,
  ExternalUrlsDto,
  LinkedFromDto,
  RestrictionsDto,
) {
  //   @ApiProperty()
  //   @IsArray()
  //   @IsObject()
  //   artists: SimplifiedArtistObjectDto[];

  @ApiProperty()
  @IsArray()
  @IsString()
  available_markets: string[];

  @ApiProperty()
  @IsInt()
  disc_number: number;

  @ApiProperty()
  @IsInt()
  duration_ms: number;

  @ApiProperty()
  @IsBoolean()
  explicit: boolean;

  //   @ApiProperty()
  //   @IsObject()
  //   external_urls: ExternalUrlsDto;

  @ApiProperty()
  @IsString()
  href: string;

  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsBoolean()
  is_playable: boolean;

  //   @ApiProperty()
  //   @IsObject()
  //   linked_from: LinkedFromDto;

  //   @ApiProperty()
  //   @IsObject()
  //   restrictions: RestrictionsDto;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  preview_url: string;

  @ApiProperty()
  @IsInt()
  track_number: number;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  uri: string;

  @ApiProperty()
  @IsBoolean()
  is_local: boolean;
}
