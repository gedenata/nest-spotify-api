import { ApiProperty } from '@nestjs/swagger';
import { ExternalUrlsDto } from './external-urls.dto';
import { ImageObjectDto } from './image-object.dto';
import { FollowersDto } from './followers.dto';
import { IsString, IsUrl, IsOptional, IsEnum, IsArray } from 'class-validator';

export class UserProfileResponseDto {
  @ApiProperty({
    description:
      "The name displayed on the user's profile. null if not available.",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  display_name: string | null;

  @ApiProperty({ description: 'Known public external URLs for this user.' })
  @IsUrl()
  external_urls: ExternalUrlsDto;

  @ApiProperty({ description: 'Information about the followers of this user.' })
  followers: FollowersDto;

  @ApiProperty({ description: 'A link to the Web API endpoint for this user.' })
  @IsUrl()
  href: string;

  @ApiProperty({ description: 'The Spotify ID for this user.' })
  @IsString()
  id: string;

  @ApiProperty({
    description: "The user's profile image.",
  })
  @IsArray()
  images: ImageObjectDto[];

  @ApiProperty({ description: 'The Spotify ID for this user.', enum: ['user'] })
  @IsEnum(['user'])
  type: string;

  @ApiProperty({ description: 'The Spotify URI for this user.' })
  @IsUrl()
  uri: string;
}
