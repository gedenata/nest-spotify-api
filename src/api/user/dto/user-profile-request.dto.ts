import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UserProfileRequestDto {
  @ApiProperty({ description: "The user's Spotify user ID.", example: 'john' })
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
