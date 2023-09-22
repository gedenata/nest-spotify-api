import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ExternalUrlsDto } from './external-urls.dto';
import { ImagesDto } from './images.dto';
import { RestrictionsDto } from './restrictions.dto';
import { SimplifiedArtistObjectDto } from './simplified-artist-object.dto';

export class ItemsSimplifiedAlbumObjectDto extends IntersectionType(
  ImagesDto,
  ExternalUrlsDto,
  RestrictionsDto,
  SimplifiedArtistObjectDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  album_type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  total_tracks: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  available_markets: number;

  //   @ApiProperty()
  //   @IsObject()
  //   external_urls: ExternalUrlsDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  href: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  //   @ApiProperty()
  //   @IsObject()
  //   images: ImagesDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  release_date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  release_date_precision: string;

  //   @ApiProperty()
  //   @IsObject()
  //   restrictions: RestrictionsDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  uri: string;

  //   @ApiProperty()
  //   @IsArray()
  //   @IsObject()
  //   artists: SimplifiedArtistObjectDto[];
}
