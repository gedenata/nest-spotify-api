import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private accessToken: string;
  private tokenExpirationTime: number;

  private isTokenExpired(): boolean {
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > this.tokenExpirationTime;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
    // Calculate and store the expiration time
    // as the current timestamp + 3600 seconds (1 hour).
    this.tokenExpirationTime = Math.floor(Date.now() / 1000) + 3600;
  }

  getAccessToken(): string {
    if (this.isTokenExpired()) {
      throw new Error('Access token has expired. Please request a new one.');
    }
    return this.accessToken;
  }
}
