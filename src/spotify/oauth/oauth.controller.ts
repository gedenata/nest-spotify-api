import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { OAuthService } from './oauth.service';
import { OAuthMiddleware } from './oauth.middleware';
import { Request, Response } from 'express';
import { CustomSessionData } from 'types/session.types';

@Controller('oauth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Get('authorize')
  @UseGuards(OAuthMiddleware)
  async authorize(@Req() req: Request, @Res() res: Response) {
    try {
      // Assume have user or client object based on authentication
      const user = (req.session as CustomSessionData)?.user;
      if (!user) res.redirect(`${req.query.redirect_uri}?error=access_denied`);

      // Perform user authorization and generate an authorization code
      const authorizationCode =
        await this.oauthService.generateAuthorizationCode(user);

      // Redirect the user back to the client application with the authorization code
      return res.redirect(
        `${req.query.redirect_uri}?code=${authorizationCode}`,
      );
    } catch (error) {
      // Handle authorization errors
      return res.redirect(`${req.query.redirect_uri}?error=access_denied`);
    }
  }

  @Post('token')
  @UseGuards(OAuthMiddleware)
  async token(@Req() req: Request, @Res() res: Response) {
    try {
      // Exchange the authorization code for an access token
      const accessToken = await this.oauthService.exchangeCodeForToken(
        req.body.code,
      );

      // Return the access token as a JSON response
      return res.json({ access_token: accessToken, token_type: 'bearer' });
    } catch (error) {
      // Handle token exchange errors
      return res.status(400).json({ error: 'invalid_grant' });
    }
  }
}
