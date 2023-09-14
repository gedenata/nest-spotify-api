import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, IsString } from 'class-validator';

export class ExternalUrlsDto {
  @ApiProperty({
    description: 'Known external URLs for this object, e.g., Spotify URL.',
  })
  @IsString()
  @IsUrl()
  spotify: string;
}
