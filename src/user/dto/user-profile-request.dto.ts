import { ApiProperty } from '@nestjs/swagger';

export class UserProfileRequestDto {
  @ApiProperty({ description: "The user's Spotify user ID.", example: 'john' })
  user_id: string;
}
