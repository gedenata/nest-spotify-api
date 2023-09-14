import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn, IsNumber, Min, Max } from 'class-validator';

export class GetUserTopItemsRequestDto {
  @ApiProperty({
    description: 'The type of entity to return (artists or tracks)',
    enum: ['artists', 'tracks'],
    default: 'artists',
  })
  @IsString()
  @IsIn(['artists', 'tracks'])
  type: string;

  @ApiProperty({
    description: 'The time frame for computing affinities',
    enum: ['long_term', 'medium_term', 'short_term'],
    default: 'medium_term',
  })
  @IsString()
  @IsIn(['long_term', 'medium_term', 'short_term'])
  time_range: string;

  @ApiProperty({
    description: 'The maximum number of items to return',
    minimum: 1,
    maximum: 50,
    default: 20,
  })
  @IsNumber()
  @Min(1)
  @Max(50)
  limit: number;

  @ApiProperty({
    description: 'The index of the first item to return',
    minimum: 0,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  offset: number;
}
