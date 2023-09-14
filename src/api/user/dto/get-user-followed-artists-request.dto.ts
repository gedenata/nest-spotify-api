import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetUserFollowedArtistsRequestDto {
  @ApiProperty({
    description: 'The ID type: currently only artist is supported.',
    enum: ['artist'],
    example: 'artist',
  })
  @IsString()
  @IsIn(['artists', { message: "Only 'artist' type is supported." }])
  type: string;

  @ApiProperty({
    description: 'The last artist ID retrieved from the previous request.',
    example: '0I2XqVXqHScXjHhk6AYYRe',
  })
  @IsString()
  @IsOptional()
  after: string;

  @ApiProperty({
    description: 'The maximum number of items to return.',
    minimum: 1,
    maximum: 50,
    default: 20,
    example: 10,
  })
  @IsInt()
  @IsOptional()
  @Min(1, { message: 'Minimum limit is 1.' })
  @Max(50, { message: 'Maximum limit is 50.' })
  limit: number;
}
