import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ExternalIdsDto {
  @ApiProperty({
    description: 'International Standard Recording Code',
  })
  @IsString()
  isrc: string;

  @ApiProperty({
    description: 'International Article Number',
  })
  @IsString()
  ean: string;

  @ApiProperty({
    description: 'Universal Product Code',
  })
  @IsString()
  upc: string;
}
