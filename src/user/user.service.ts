import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserTopItemsRequestDto } from './dto/get-user-top-items-request.dto';
import { GetUserTopItemsResponseDto } from './dto/get-user-top-items-response.dto';
import { ErrorResponseDto } from 'shared/dto/error-response.dto';
import { UserProfileDto } from './dto/user-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getUserProfile(): Promise<UserProfileDto> {
    try {
      const userProfile: UserProfileDto = {
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
      return userProfile;
    } catch (error) {
      // Handle errors here
      if (error.response) {
        const { status, data } = error.response;
        if (status === HttpStatus.UNAUTHORIZED) {
          // Unauthorized error (e.g., token expired)
          throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        } else if (status === HttpStatus.FORBIDDEN) {
          // Forbidden error (e.g., insufficient permissions)
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        } else if (status === HttpStatus.TOO_MANY_REQUESTS) {
          // Rate limiting error
          throw new HttpException(
            'Too Many Requests',
            HttpStatus.TOO_MANY_REQUESTS,
          );
        } else {
          // Handle other errors (customize as needed)
          throw new HttpException(data, status);
        }
      } else {
        // Handle network errors or unexpected issues
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getUserCountry(userId: number): Promise<string | null> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      return user ? user.country : null;
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
    accessToken: string,
    dto: GetUserTopItemsRequestDto,
  ): Promise<GetUserTopItemsResponseDto> {
    try {
      // Validate the type parameter
      if (dto.type !== 'artists' && dto.type !== 'tracks') {
        throw new HttpException(
          'Invalid type parameter',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Construct the endpoint URL based on the specified type, time range, limit, and offset
      const endpointUrl = `https://api.spotify.com/v1/me/top/${dto.type}?time_range=${dto.time_range}&limit=${dto.limit}&offset=${dto.offset}`;

      // Make a GET request to the Spotify API to fetch the user's top items
      const response = await axios.get(endpointUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        // TODO: You can add any query parameters or options as needed
      });

      return response.data;
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
