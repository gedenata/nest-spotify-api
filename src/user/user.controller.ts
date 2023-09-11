import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { SkipThrottle } from '@nestjs/throttler';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserTopItemsResponseDto } from './dto/get-user-top-items-response.dto';
import { GetUserTopItemsRequestDto } from './dto/get-user-top-items-request.dto';
import { ErrorResponseDto } from 'shared/dto/error-response.dto';
import { CurrentUserProfileResponseDto } from './dto/current-user-profile-response.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { FollowPlaylistDto } from './dto/follow-playlist.dto';
import CustomRequest from 'src/auth/interfaces/custom-request.interface';

@Controller('v1')
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

  @Put('playlists/:playlist_id/followers')
  @UseGuards(AuthGuard('jwt'))
  async followPlaylist(
    @Req() req: any,
    @Param('playlist_id') playlistId: string,
    @Body() followPlaylistDto: FollowPlaylistDto,
  ) {
    try {
      const userId = req.user.id;
      const isPublic = followPlaylistDto.public || true;
      const updatedUser = await this.userService.followPlaylist(
        userId,
        playlistId,
        isPublic,
      );
      return updatedUser;
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

  @Delete('playlists/:playlist_id/followers')
  @UseGuards(AuthGuard('jwt'))
  async unfollowPlaylist(
    @Req() req: any,
    @Param('playlist_id') playlistId: string,
  ) {
    try {
      const userId = req.user.id;
      await this.userService.unfollowPlaylist(userId, playlistId);
      return {
        message: 'Successfully unfollowed the playlist',
      };
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
