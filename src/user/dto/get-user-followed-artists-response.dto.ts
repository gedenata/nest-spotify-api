import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class GetUserFollowedArtistsResponseDto {
  @ApiProperty({
    description: 'The pages set of artists.',
  })
  @ValidateNested()
  @IsObject()
  artist: Artist;
}

class Artist {
  @ApiProperty({
    description:
      'A link to the Web API endpoint returning the full result of the request.',
  })
  @IsString()
  href: string;

  @ApiProperty({
    description:
      'The maximum number of items in the response (as set the query or by default.)',
  })
  @IsInt()
  limit: number;

  @ApiProperty({
    description: 'URL to the next page of items. (`null` if none)',
  })
  @IsString()
  next: string;

  @ApiProperty({
    description: 'The cursors used to find the next set of items.',
  })
  @ValidateNested()
  @IsObject()
  cursors: Cursors;

  @ApiProperty({
    description: 'The total number of items available to return.',
  })
  @IsInt()
  total: number;

  @ApiProperty({
    description: 'An array of artist object.',
  })
  @ValidateNested()
  @IsArray()
  items: Items[];
}

class Cursors {
  @ApiProperty({
    description: 'The cursor to use as key to find the next page of items.',
  })
  @IsString()
  after: string;

  @ApiProperty({
    description: 'The cursor to use as key to find the previous page of items.',
  })
  @IsString()
  before: string;
}

class Items {
  @ApiProperty({
    description: 'Known external URLs for this artist.',
  })
  @ValidateNested()
  @IsObject()
  external_urls: ExternalUrls;

  @ApiProperty({
    description: 'Information about the followers of the artist.',
  })
  @ValidateNested()
  @IsObject()
  followers: Followers;

  @ApiProperty({
    description:
      'A list of the genres the artist is associated with. If not yet classified, the array is empty.',
    example: ['Prog rock', 'Grunge'],
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  genres: string[];

  @ApiProperty({
    description:
      'A link to the Web API endpoint providing full details of the artist.',
  })
  @IsString()
  href: string;

  @ApiProperty({
    description: 'The Spotify ID for the artist.',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Images of the artist in various sizes, widest first.',
  })
  @ValidateNested()
  @IsArray()
  images: Images[];

  @ApiProperty({
    description: 'The name of the artist.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The popularity of the artist.',
    example: 75,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  popularity: number;

  @ApiProperty({
    description: 'The object type.',
    example: 'artist',
  })
  @IsString()
  @IsIn(['artist'])
  type: string;

  @ApiProperty({
    description: 'The Spotify URI for the artist.',
    example: 'spotify:artists:XXXXXX',
  })
  @IsString()
  uri: string;
}

class ExternalUrls {
  @ApiProperty({
    description: 'The Spotify URL for the object.',
  })
  @IsString()
  spotify: string;
}

class Followers {
  @ApiProperty({
    description:
      'This is always be set null, as the Web API does not support it at the moment.',
  })
  @IsString()
  href: string | null;

  @ApiProperty({
    description: 'The total number of followers.',
  })
  @IsInt()
  total: number;
}

class Images {
  @ApiProperty({
    description: 'The source URL of the image.',
    example: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
  })
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'The image height in pixels.',
    example: 300,
  })
  @IsInt()
  @IsNotEmpty()
  height: number | null;

  @ApiProperty({
    description: 'The image weight in pixels.',
    example: 300,
  })
  @IsInt()
  @IsNotEmpty()
  weight: number | null;
}
