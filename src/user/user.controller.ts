import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { SkipThrottle } from '@nestjs/throttler';
import { GetUserTopItemsResponseDto } from './dto/get-user-top-items-response.dto';
import { GetUserTopItemsRequestDto } from './dto/get-user-top-items-request.dto';
import { ErrorResponseDto } from 'shared/dto/error-response.dto';
import { CurrentUserProfileResponseDto } from './dto/current-user-profile-response.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import CustomRequest from 'src/auth/interfaces/custom-request.interface';

@Controller('v1/me')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @SkipThrottle()
  @ApiResponse({
    status: 200,
    description: "Get the current user's profile",
    type: CurrentUserProfileResponseDto,
  })
  async getCurrentUserProfile(
    @Req() req: CustomRequest,
  ): Promise<CurrentUserProfileResponseDto> {
    try {
      const userId = (req.user as { id: string }).id;
      const currentUserProfile =
        await this.userService.getCurrentUserProfile(userId);
      return currentUserProfile;
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

  @Get('users/:user_id')
  @ApiParam({ name: 'user_id', description: 'User ID', example: '12345' })
  @ApiResponse({ status: 200, description: 'Get user profile by ID' })
  async getUserProfile(): Promise<UserProfileResponseDto> {
    try {
      const userProfile = await this.userService.getUserProfile();
      return userProfile;
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

  @Get('me/top/:type')
  @ApiParam({ name: 'type', description: 'Top item type', example: 'tracks' })
  @ApiQuery({
    name: 'limit',
    description: 'Limit the number of items',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: "Get the current user's top items",
    type: GetUserTopItemsResponseDto,
  })
  @UseGuards(AuthGuard('jwt'))
  async getUserTopItems(
    @Req() req: CustomRequest,
    @Param('type') type: string,
    @Query('limit') limit?: number,
  ): Promise<GetUserTopItemsResponseDto> {
    try {
      const userId = (req.user as { id: string }).id;
      // Create a GetUserTopItemsRequestDto with the provided type and limit
      const dto = new GetUserTopItemsRequestDto();
      dto.type = type;
      dto.limit = limit;

      // Fetch the user's top items using the user service
      return this.userService.getUserTopItems(userId, dto);
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
