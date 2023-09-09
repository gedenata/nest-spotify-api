import { ApiProperty } from '@nestjs/swagger';
import { ArtistObjectDto } from './artist-object.dto';
import { TrackObjectDto } from './track-object.dto';

export class GetUserTopItemsResponseDto {
  @ApiProperty({
    description:
      'A link to the Web API endpoint returning the full result of the request',
  })
  href: string;

  @ApiProperty({
    description:
      'The maximum number of items in the response (as set in the query or by default)',
  })
  limit: number;

  @ApiProperty({
    description: 'URL to the next page of items. (null if none)',
    nullable: true,
  })
  next: string | null;

  @ApiProperty({
    description:
      'The offset of the items returned (as set in the query or by default).',
  })
  offset: number;

  @ApiProperty({
    description: 'URL to the previous page of items (null if none).',
    nullable: true,
  })
  previous: string | null;

  @ApiProperty({
    description: 'The total number of items available to return.',
  })
  total: number;

  @ApiProperty({
    description:
      'An array of items, which can be either ArtistObject or TrackObject.',
  })
  items: (ArtistObjectDto | TrackObjectDto)[];
}
