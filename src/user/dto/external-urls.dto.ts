import { ApiProperty } from '@nestjs/swagger';

export class ExternalUrlsDto {
  @ApiProperty({
    description: 'Known external URLs for this object, e.g., Spotify URL.',
  })
  spotify: string;
}
