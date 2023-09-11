import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entity/user.entity';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

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

  // Create a JWT token with 'id' in the payload
  async createJwtToken(userId: string): Promise<string> {
    const payload = { id: userId };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
  }

  async validateUser(userId: string): Promise<UserEntity | null> {
    // Implement user validation logic here
    // Example: Fetch the user from a database
    const user = await this.userRepository.findUserProfileById(userId);
    return user || null; // Return the user or null if not found
  }
}
