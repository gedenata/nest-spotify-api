import { ApiProperty } from '@nestjs/swagger';

export class ExternalIdsDto {
  @ApiProperty({
    description: 'International Standard Recording Code',
  })
  isrc: string;

  @ApiProperty({
    description: 'International Article Number',
  })
  ean: string;

  @ApiProperty({
    description: 'Universal Product Code',
  })
  upc: string;
}
