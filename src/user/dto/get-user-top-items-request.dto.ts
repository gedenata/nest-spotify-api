import { ApiProperty } from '@nestjs/swagger';

export class GetUserTopItemsRequestDto {
  @ApiProperty({
    description: 'The type of entity to return (artists or tracks)',
    enum: ['artists', 'tracks'],
    default: 'artists',
  })
  type: string;

  @ApiProperty({
    description: 'The time frame for computing affinities',
    enum: ['long_term', 'medium_term', 'short_term'],
    default: 'medium_term',
  })
  time_range: string;

  @ApiProperty({
    description: 'The maximum number of items to return',
    minimum: 1,
    maximum: 50,
    default: 20,
  })
  limit: number;

  @ApiProperty({
    description: 'The index of the first item to return',
    minimum: 0,
    default: 0,
  })
  offset: number;
}
