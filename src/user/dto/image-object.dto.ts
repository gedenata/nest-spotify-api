import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class ImageObjectDto {
  @ApiProperty({ description: 'The source URL of the image.' })
  @IsString()
  url: string;

  @ApiProperty({ description: 'The image height in pixels.', nullable: true })
  @IsOptional()
  @IsNumber()
  height: number | null;

  @ApiProperty({ description: 'The image width in pixels.', nullable: true })
  @IsOptional()
  @IsNumber()
  width: number | null;
}
