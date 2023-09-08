import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SpotifyService } from 'src/spotify/spotify.service';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly spotifyService: SpotifyService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getUserProfile(accessToken: string) {
    // Use the Spotify service to fetch the user's profile
    return this.spotifyService.getCurrentUserProfile(accessToken);
  }

  async getUserCountry(userId: number): Promise<string | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user ? user.country : null;
  }

  async verifyAccessToken(accessToken: string) {
    try {
      // Logic to verify the access token goes here.
      const user = await this.spotifyService.getCurrentUserProfile(accessToken);

      // If the token is invalid or expired, you can throw an UnauthorizedException.
      if (!user) {
        throw new UnauthorizedException('Bad or expired token');
      }

      // If the token is valid, return the user or perform other actions.
      return user;
    } catch (error) {
      console.error('Error verifying access token:', error);
      throw new UnauthorizedException('Access token verification failed');
    }
  }
}
