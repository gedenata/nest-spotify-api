import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class FollowersDto {
  @ApiProperty({
    description:
      'Href to the followers (null as Web API does not support it at the moment).',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  href: string | null;

  @ApiProperty({ description: 'The total number of followers.' })
  @IsNumber()
  total: number;
}
