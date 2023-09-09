import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'The HTTP status code (also returned in the response header',
    example: 400,
  })
  status: number;

  @ApiProperty({
    description: 'A short description of the cause of the error.',
    example: 'Bad Request',
  })
  message: string;
}
