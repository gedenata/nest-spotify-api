import { ApiProperty } from '@nestjs/swagger';

export class ImageObjectDto {
  @ApiProperty({ description: 'The source URL of the image.' })
  url: string;

  @ApiProperty({ description: 'The image height in pixels.', nullable: true })
  height: number | null;

  @ApiProperty({ description: 'The image width in pixels.', nullable: true })
  width: number | null;
}
