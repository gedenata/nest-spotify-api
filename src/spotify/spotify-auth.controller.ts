import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { SpotifyAuthService } from './spotify-auth.service';

@Controller('auth')
export class SpotifyAuthController {
  constructor(private readonly spotifyAuthService: SpotifyAuthService) {}

  @Get()
  @Redirect()
  initiateAuthorization() {
    const authorizationUrl = this.spotifyAuthService.getAuthorizationUrl();
    return { url: authorizationUrl };
  }

  @Get('callback')
  async handleCallback(@Query('code') code: string) {
    try {
      const accessToken =
        await this.spotifyAuthService.exchangeCodeForAccessToken(code);

      // Handle the obtained access token then store it in user's session or database.
      return `Access token: ${accessToken}`;
    } catch (error) {
      // Handle any errors that may occur during the callback process.
      return `Error: ${error.message}`;
    }
  }
}
