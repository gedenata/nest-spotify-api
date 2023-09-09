import { ApiProperty } from '@nestjs/swagger';
import { ExternalUrlsDto } from './external-urls.dto';
import { ImageObjectDto } from './image-object.dto';

export class UserProfileDto {
  @ApiProperty({
    description:
      "The country of the user, as set in the user's account profile. An ISO 3166-1 alpha-2 country code",
  })
  country: string;

  @ApiProperty({
    description:
      "The name displayed on the user's profile. Null if not available",
  })
  display_name: string | null;

  @ApiProperty({
    description:
      "The user's email address, as entered by the user when creating their account. This email address is unverified",
  })
  email: string | null;

  @ApiProperty({
    description: 'Known external URLs for this user',
  })
  explicit_content: ExplicitContentDto;

  @ApiProperty({
    description: '',
  })
  external_urls: ExternalUrlsDto;

  @ApiProperty({
    description: 'Information about the followers of the user',
  })
  followers: FollowersDto;

  @ApiProperty({
    description: 'A link to the Web API endpoint for this user',
  })
  href: string;

  @ApiProperty({
    description: 'The Spotify user ID for the user',
  })
  id: string;

  @ApiProperty({
    description: "The user's profile image",
    type: [ImageObjectDto],
  })
  images: ImageObjectDto[];

  @ApiProperty({
    description: "The user's Spotify subscription level (e.g., premium, free)",
  })
  product: string;

  @ApiProperty({
    description: 'The object type (e.g , user)',
  })
  type: string;

  @ApiProperty({
    description: 'The Spotify URI for the user.',
  })
  uri: string;
}

export class ExplicitContentDto {
  @ApiProperty({
    description: 'Indicates if explicit content should not be played',
  })
  filter_enabled: boolean;

  @ApiProperty({
    description:
      'Indicates if the explicit content setting is locked and cannot be changed by the user',
  })
  filter_locked: boolean;
}

class FollowersDto {
  @ApiProperty({ description: 'A link to the Web API endpoint for this user' })
  href: string;

  @ApiProperty({ description: 'The total number of followers' })
  total: number;
}
