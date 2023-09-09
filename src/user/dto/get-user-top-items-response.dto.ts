import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ArtistObjectDto } from './artist-object.dto';
import { TrackObjectDto } from './track-object.dto';

export class GetUserTopItemsResponseDto {
  @ApiProperty({
    description:
      'A link to the Web API endpoint returning the full result of the request',
  })
  @IsString()
  href: string;

  @ApiProperty({
    description:
      'The maximum number of items in the response (as set in the query or by default)',
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: 'URL to the next page of items. (null if none)',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  next: string | null;

  @ApiProperty({
    description:
      'The offset of the items returned (as set in the query or by default).',
  })
  @IsNumber()
  offset: number;

  @ApiProperty({
    description: 'URL to the previous page of items (null if none).',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  previous: string | null;

  @ApiProperty({
    description: 'The total number of items available to return.',
  })
  @IsNumber()
  total: number;

  @ApiProperty({
    description:
      'An array of items, which can be either ArtistObject or TrackObject.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  items: (ArtistObjectDto | TrackObjectDto)[];
}
