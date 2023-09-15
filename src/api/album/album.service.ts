import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetAlbumResponseDto } from './dto/get-album-response.dto';
import { ErrorResponseDto } from 'src/shared/dto/error-response.dto';

@Injectable()
export class AlbumService {
  async getAlbum(
    album_id: string,
    market?: string,
  ): Promise<GetAlbumResponseDto> {
    try {
      const albumData: GetAlbumResponseDto = {
        album_type: 'album',
        total_tracks: 10,
        available_markets: [market],
        external_urls: {
          spotify: 'https://open.spotify.com/album/your-album-id',
        },
        href: 'https://api.spotify.com/v1/albums/your-album-id',
        album_id: album_id,
        images: [
          {
            url: 'https://i.scdn.co/image/your-image-url',
            height: 300,
            width: 300,
          },
        ],
        name: 'Sample Album',
        release_date: '2023-01-01',
        release_date_precision: 'day',
        restrictions: {
          reason: 'market',
        },
        type: 'album',
        url: 'https://open.spotify.com/album/your-album-id',
        artist: {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/your-artist-id',
          },
          href: 'https://api.spotify.com/v1/artists/your-artist-id',
          artist_id: 'your-artist-id',
          name: 'Sample Artist',
          type: 'artist',
          uri: 'spotify:artist:your-artist-id',
        },
        tracks: {
          href: 'https://api.spotify.com/v1/albums/your-album-id/tracks',
          limit: 10,
          next: null,
          offset: 0,
          previous: null,
          total: 10,
          items: [
            {
              artist: {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/your-artist-id-1',
                },
                href: 'https://api.spotify.com/v1/artists/your-artist-id-1',
                artist_id: 'your-artist-id-1',
                name: 'Sample Artist 1',
                type: 'artist',
                uri: 'spotify:artist:your-artist-id-1',
              },
              available_markets: ['US', 'CA'],
              disc_number: 1,
              duration_ms: 240000,
              explicit: false,
              external_urls: {
                spotify: 'https://open.spotify.com/track/your-track-id-1',
              },
              href: 'https://api.spotify.com/v1/tracks/your-track-id-1',
              track_id: 'your-track-id-1',
              is_playable: true,
              linked_from: {
                external_urls: {
                  spotify: 'https://open.spotify.com/track/linked-track-id-1',
                },
                href: 'https://api.spotify.com/v1/tracks/linked-track-id-1',
                track_id: 'linked-track-id-1',
                type: 'track',
                url: 'https://open.spotify.com/track/linked-track-id-1',
              },
              restrictions: {
                reason: 'market',
              },
              name: 'Sample Track 1',
              preview_url: 'https://example.com/sample-track-1-preview.mp3',
              track_number: 1,
              type: 'track',
              url: 'https://open.spotify.com/track/your-track-id-1',
              is_local: false,
            },
          ],
        },
        copyrights: {
          text: '© 2023 Sample Music',
          type: 'C',
        },
        external_ids: {
          isrc: 'your-isrc',
          ean: 'your-ean',
          upc: 'your-upc',
        },
        genres: ['Pop', 'Rock'],
        label: 'Sample Label',
        popularity: 75,
      };
      return albumData;
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

  async getSeveralAlbums() {
    try {
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

  async getAlbumTracks() {
    try {
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

  async getUserSavedAlbums() {
    try {
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

  async saveAlbumsForCurrentUser() {
    try {
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

  async removeUserSavedAlbums() {
    try {
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

  async checkUserSavedAlbums() {
    try {
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

  async getNewReleases() {
    try {
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
