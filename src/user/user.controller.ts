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
import { ErrorResponseDto } from 'shared/dto/error-response.dto';
import { UserProfileDto } from './dto/user-profile.dto';

@Controller('v1/me')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @SkipThrottle()
  async getUserProfile(): Promise<UserProfileDto> {
    try {
      return await this.userService.getUserProfile();
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
    @Req() req: Request,
  ): Promise<GetUserTopItemsResponseDto> {
    try {
      // Access the user's token from the request
      const accessToken = (req.user as { accessToken: string }).accessToken;

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
