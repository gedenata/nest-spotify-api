import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'The HTTP status code also returned in the response header',
    example: 400,
  })
  @IsNumber()
  status: number;

  @ApiProperty({
    description: 'A short description of the cause of the error.',
    example: 'Bad Request',
  })
  @IsString()
  message: string;
}
