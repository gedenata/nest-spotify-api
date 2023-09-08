import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SpotifyService } from 'src/spotify/spotify.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    HttpModule,
    AuthModule,
    TypeOrmModule.forFeature([User, UserRepository]),
  ],
  providers: [UserService, SpotifyService],
})
export class UserModule {}
