import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Request } from 'express';
import { SkipThrottle } from '@nestjs/throttler';
import { GetUserTopItemsResponseDto } from './dto/get-user-top-items-response.dto';
import { GetUserTopItemsRequestDto } from './dto/get-user-top-items-request.dto';
import { ErrorResponseDto } from './dto/error-response.dto';

// Create a custom interface to extend the Request type
interface AuthenticatedRequest extends Request {
  user: {
    accessToken: string; // Define the structure of your user object here
    // Add other user-related properties if needed
  };
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @SkipThrottle()
  async getProfile(@Req() req: AuthenticatedRequest) {
    try {
      // Access the user's token from the request
      const accessToken = req.user.accessToken;

      // Fetch the user's profile using the user service
      return await this.userService.getUserProfile(accessToken);
    } catch (error) {
      // Handle UnauthorizedException
      if (error.response) {
        const { status, data } = error.response;
        throw new HttpException(data, status);
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

  @Get('top')
  @UseGuards(AuthGuard('jwt'))
  async getUserTopItems(
    @Req() req: AuthenticatedRequest,
  ): Promise<GetUserTopItemsResponseDto> {
    try {
      // Access the user's token from the request
      const accessToken = req.user.accessToken;
      // Create a GetUserTopItemsRequestDto with default values or values you need
      const dto = new GetUserTopItemsRequestDto();

      // Fetch the user's top items using the user service
      return this.userService.getUserTopItems(accessToken, dto);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        throw new HttpException(data, status);
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
