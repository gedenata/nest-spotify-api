import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ExplicitContentDto {
  @ApiProperty({
    description: 'Indicates if explicit content should not be played',
  })
  @IsBoolean()
  filter_enabled: boolean;

  @ApiProperty({
    description:
      'Indicates if the explicit content setting is locked and cannot be changed by the user',
  })
  @IsBoolean()
  filter_locked: boolean;
}
