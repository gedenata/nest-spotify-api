import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorResponseDto } from 'src/shared/dto/error-response.dto';

@Injectable()
export class SearchService {
  async getSearchForItem() {
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
