import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Request } from 'express';

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
  async getProfile(@Req() req: AuthenticatedRequest) {
    try {
      // Access the user's token from the request
      const accessToken = req.user.accessToken;

      // Fetch the user's profile using the user service
      return await this.userService.getUserProfile(accessToken);
    } catch (error) {
      // Handle UnauthorizedException
      if (error instanceof UnauthorizedException) {
        // Customize the 401 Unauthorized response
        return {
          error: {
            status: 401,
            message: 'Unauthorized', // Customize the message as needed
          },
        };
      }
      // Handle other exceptions or re-throw them if necessary
      throw error;
    }
  }
}
