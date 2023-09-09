import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { ExternalUrlsDto } from './external-urls.dto';
import { ImageObjectDto } from './image-object.dto';
import { FollowersDto } from './followers.dto';
import { ExplicitContentDto } from './explicit-content.dto';

export class CurrentUserProfileResponseDto {
  @ApiProperty({
    description:
      "The country of the user, as set in the user's account profile. An ISO 3166-1 alpha-2 country code",
  })
  @IsString()
  country: string;

  @ApiProperty({
    description:
      "The name displayed on the user's profile. Null if not available",
    nullable: true,
  })
  @IsString()
  display_name: string | null;

  @ApiProperty({
    description:
      "The user's email address, as entered by the user when creating their account. This email address is unverified",
    nullable: true,
  })
  @IsString()
  email: string | null;

  @ApiProperty({
    description: 'Known external URLs for this user',
  })
  @ValidateNested()
  external_urls: ExternalUrlsDto;

  @ApiProperty({
    description: 'Information about the followers of the user',
  })
  @ValidateNested()
  followers: FollowersDto;

  @ApiProperty({
    description: 'A link to the Web API endpoint for this user',
  })
  @IsString()
  href: string;

  @ApiProperty({
    description: 'The Spotify user ID for the user',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "The user's profile image",
    type: [ImageObjectDto],
  })
  @ValidateNested({ each: true })
  images: ImageObjectDto[];

  @ApiProperty({
    description: "The user's Spotify subscription level (e.g., premium, free)",
  })
  @IsString()
  product: string;

  @ApiProperty({
    description: 'The object type (e.g., user)',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'The Spotify URI for the user.',
  })
  @IsString()
  uri: string;

  @ApiProperty({
    description: 'Indicates if explicit content should not be played',
  })
  @ValidateNested()
  explicit_content: ExplicitContentDto;
}
