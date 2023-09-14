import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SpotifyService } from 'src/spotify/spotify.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    HttpModule,
    AuthModule,
    TypeOrmModule.forFeature([UserEntity, UserRepository]),
  ],
  providers: [UserService, SpotifyService],
})
export class UserModule {}
