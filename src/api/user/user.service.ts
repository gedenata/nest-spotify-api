import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { GetUserTopItemsRequestDto } from './dto/get-user-top-items-request.dto';
import { GetUserTopItemsResponseDto } from './dto/get-user-top-items-response.dto';
import { ErrorResponseDto } from 'src/shared/dto/error-response.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { CurrentUserProfileResponseDto } from './dto/current-user-profile-response.dto';
import { ArtistObjectDto } from './dto/artist-object.dto';
import { TrackObjectDto } from './dto/track-object.dto';
import { ExternalUrlsDto } from './dto/external-urls.dto';
import { RestrictionsDto } from './dto/restrictions.dto';
import { FollowersDto } from './dto/followers.dto';
import { ExternalIdsDto } from './dto/external-ids.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getCurrentUserProfile(
    userId: string,
  ): Promise<CurrentUserProfileResponseDto> {
    try {
      const user = await this.userRepository.findUserProfileById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const currentUserProfileResponse: CurrentUserProfileResponseDto = {
        country: 'US',
        display_name: 'John Doe',
        email: 'johndoe@example.com',
        explicit_content: {
          filter_enabled: false,
          filter_locked: false,
        },
        external_urls: {
          spotify: 'https://open.spotify.com/user/johndoe',
        },
        followers: {
          href: null,
          total: 42,
        },
        href: 'https://api.spotify.com/v1/users/johndoe',
        id: 'johndoe',
        images: [
          {
            url: 'https://example.com/image.jpg',
            height: 300,
            width: 300,
          },
        ],
        product: 'premium',
        type: 'user',
        uri: 'spotify:user:johndoe',
      };
      return currentUserProfileResponse;
    } catch (error) {
      // Handle errors here
      if (error.response) {
        const { status, data } = error.response;
        if (status === HttpStatus.UNAUTHORIZED) {
          // Unauthorized error (e.g., token expired)
          throw new HttpException(data, HttpStatus.UNAUTHORIZED);
        } else if (status === HttpStatus.FORBIDDEN) {
          // Forbidden error (e.g., insufficient permissions)
          throw new HttpException(data, HttpStatus.FORBIDDEN);
        } else if (status === HttpStatus.TOO_MANY_REQUESTS) {
          // Rate limiting error
          throw new HttpException(data, HttpStatus.TOO_MANY_REQUESTS);
        } else if (status === HttpStatus.BAD_REQUEST) {
          // Bad Request error (customize as needed)
          throw new HttpException(data, HttpStatus.BAD_REQUEST);
        } else {
          // Handle other errors (customize as needed)
          throw new HttpException(data, status);
        }
      } else {
        // Handle network errors or unexpected issues
        const errorResponse: ErrorResponseDto = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error',
        };
        throw new HttpException(
          errorResponse,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getUserProfile(): Promise<UserProfileResponseDto> {
    try {
      const userProfileResponse: UserProfileResponseDto = {
        display_name: 'John Doe',
        external_urls: {
          spotify: 'https://open.spotify.com/user/johndoe',
        },
        followers: {
          href: null,
          total: 42,
        },
        href: 'https://api.spotify.com/v1/users/johndoe',
        id: 'johndoe',
        images: [
          {
            url: 'https://example.com/image.jpg',
            height: 300,
            width: 300,
          },
        ],
        type: 'user',
        uri: 'spotify:user:johndoe',
      };
      return userProfileResponse;
    } catch (error) {
      // Handle errors here
      if (error.response) {
        const { status, data } = error.response;
        if (status === HttpStatus.UNAUTHORIZED) {
          // Unauthorized error (e.g., token expired)
          throw new HttpException(data, HttpStatus.UNAUTHORIZED);
        } else if (status === HttpStatus.FORBIDDEN) {
          // Forbidden error (e.g., insufficient permissions)
          throw new HttpException(data, HttpStatus.FORBIDDEN);
        } else if (status === HttpStatus.TOO_MANY_REQUESTS) {
          // Rate limiting error
          throw new HttpException(data, HttpStatus.TOO_MANY_REQUESTS);
        } else if (status === HttpStatus.BAD_REQUEST) {
          // Bad Request error (customize as needed)
          throw new HttpException(data, HttpStatus.BAD_REQUEST);
        } else {
          // Handle other errors (customize as needed)
          throw new HttpException(data, status);
        }
      } else {
        // Handle network errors or unexpected issues
        const errorResponse: ErrorResponseDto = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error',
        };
        throw new HttpException(
          errorResponse,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getUserTopItems(
    userId: string,
    dto: GetUserTopItemsRequestDto,
  ): Promise<GetUserTopItemsResponseDto> {
    try {
      const userTopItems = await this.userRepository.getUserTopItems(
        userId,
        dto.type,
        dto.limit,
      );

      // Map userTopItems to the expected response DTO format
      const items: (ArtistObjectDto | TrackObjectDto)[] = userTopItems.map(
        (item) => {
          if (dto.type === 'artists') {
            // Create a new ArtistObjectDto instance
            const artistDto: ArtistObjectDto = {
              external_urls: {
                spotify: '',
              },
              followers: {
                href: '',
                total: 0,
              },
              genres: ['', ''],
              href: '',
              id: '',
              images: [{ url: '', height: 0, width: 0 }],
              name: '',
              popularity: 0,
              type: 'artist',
              uri: '',
            };
            return artistDto;
          } else if (dto.type === 'tracks') {
            // Create a new TrackObjectDto instance
            const trackDto: TrackObjectDto = {
              album: {
                album_type: '',
                total_tracks: 0,
                available_markets: [],
                external_urls: new ExternalUrlsDto(),
                href: '',
                id: item.user_id,
                images: [],
                name: '',
                release_date: '',
                release_date_precision: '',
                restrictions: new RestrictionsDto(),
                type: '',
                uri: '',
                artists: [],
              },
              artist: [
                {
                  external_urls: new ExternalUrlsDto(),
                  followers: new FollowersDto(),
                  genres: ['', ''],
                  href: '',
                  id: item.user_id,
                  images: [{ url: '', height: 0, width: 0 }],
                  name: '',
                  popularity: 0,
                  type: 'artist',
                  uri: '',
                },
              ],
              available_markets: [],
              disc_number: 0,
              id: item.user_id,
              name: 'Track Name',
              type: 'track',
              duration_ms: 0,
              explicit: false,
              external_ids: new ExternalIdsDto(),
              external_urls: new ExternalUrlsDto(),
              href: '',
              is_playable: false,
              linked_from: undefined,
              restrictions: new RestrictionsDto(),
              popularity: 0,
              preview_url: '',
              track_number: 0,
              url: '',
              is_local: false,
            };
            return trackDto;
          } else {
            // Handle other types or throw an error
            throw new HttpException(
              'Invalid type parameter',
              HttpStatus.BAD_REQUEST,
            );
          }
        },
      );

      // Format the result into the response DTO
      const response: GetUserTopItemsResponseDto = {
        href: 'your_href_value',
        limit: dto.limit,
        next: 'your_next_value',
        offset: 0, // Set the appropriate offset value if needed
        previous: null, // Set the previous value if applicable
        total: userTopItems.length, // Get the total count of items
        items,
      };
      return response;
    } catch (error) {
      // Handle errors here
      if (error.response) {
        const { status, data } = error.response;
        if (status === HttpStatus.UNAUTHORIZED) {
          // Unauthorized error (e.g., token expired)
          throw new HttpException(data, HttpStatus.UNAUTHORIZED);
        } else if (status === HttpStatus.FORBIDDEN) {
          // Forbidden error (e.g., insufficient permissions)
          throw new HttpException(data, HttpStatus.FORBIDDEN);
        } else if (status === HttpStatus.TOO_MANY_REQUESTS) {
          // Rate limiting error
          throw new HttpException(data, HttpStatus.TOO_MANY_REQUESTS);
        } else if (status === HttpStatus.BAD_REQUEST) {
          // Bad Request error (customize as needed)
          throw new HttpException(data, HttpStatus.BAD_REQUEST);
        } else {
          // Handle other errors (customize as needed)
          throw new HttpException(data, status);
        }
      } else {
        // Handle network errors or unexpected issues
        const errorResponse: ErrorResponseDto = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error',
        };
        throw new HttpException(
          errorResponse,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async followPlaylist(userId: number, playlistId: string, isPublic: boolean) {
    try {
      const updatedUser = await this.userRepository.followPlaylist(
        userId,
        playlistId,
        isPublic,
      );

      return updatedUser;
    } catch (error) {
      // Handle errors here
      if (error.response) {
        const { status, data } = error.response;
        if (status === HttpStatus.UNAUTHORIZED) {
          // Unauthorized error (e.g., token expired)
          throw new HttpException(data, HttpStatus.UNAUTHORIZED);
        } else if (status === HttpStatus.FORBIDDEN) {
          // Forbidden error (e.g., insufficient permissions)
          throw new HttpException(data, HttpStatus.FORBIDDEN);
        } else if (status === HttpStatus.TOO_MANY_REQUESTS) {
          // Rate limiting error
          throw new HttpException(data, HttpStatus.TOO_MANY_REQUESTS);
        } else if (status === HttpStatus.BAD_REQUEST) {
          // Bad Request error (customize as needed)
          throw new HttpException(data, HttpStatus.BAD_REQUEST);
        } else {
          // Handle other errors (customize as needed)
          throw new HttpException(data, status);
        }
      } else {
        // Handle network errors or unexpected issues
        const errorResponse: ErrorResponseDto = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error',
        };
        throw new HttpException(
          errorResponse,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async unfollowPlaylist(userId: number, playlistId: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (user.followedPlaylists.includes(playlistId)) {
        user.followedPlaylists = user.followedPlaylists.filter(
          (id) => id !== playlistId,
        );

        await this.userRepository.save(user);
      }
    } catch (error) {
      // Handle errors here
      if (error.response) {
        const { status, data } = error.response;
        if (status === HttpStatus.UNAUTHORIZED) {
          // Unauthorized error (e.g., token expired)
          throw new HttpException(data, HttpStatus.UNAUTHORIZED);
        } else if (status === HttpStatus.FORBIDDEN) {
          // Forbidden error (e.g., insufficient permissions)
          throw new HttpException(data, HttpStatus.FORBIDDEN);
        } else if (status === HttpStatus.TOO_MANY_REQUESTS) {
          // Rate limiting error
          throw new HttpException(data, HttpStatus.TOO_MANY_REQUESTS);
        } else if (status === HttpStatus.BAD_REQUEST) {
          // Bad Request error (customize as needed)
          throw new HttpException(data, HttpStatus.BAD_REQUEST);
        } else {
          // Handle other errors (customize as needed)
          throw new HttpException(data, status);
        }
      } else {
        // Handle network errors or unexpected issues
        const errorResponse: ErrorResponseDto = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error',
        };
        throw new HttpException(
          errorResponse,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
