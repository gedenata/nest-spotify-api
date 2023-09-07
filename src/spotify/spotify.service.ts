import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SpotifyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
  ) {}

  async getSomeDataFromSpotify() {
    const accessToken = this.authService.getAccessToken();
    const apiUrl = 'http://localhost:3000/api/data'; // Replace with the desired Spotify API endpoint

    try {
      const response = await firstValueFrom(
        this.httpService.get(apiUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      );
      return response.data;
    } catch (error) {
      console.error('Error accessing Spotify API:', error.message);
      console.error('Spotify API Response:', error.response?.data);
      throw new Error('Error accessing Spotify API');
    }
  }
}
