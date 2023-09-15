import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';

@Module({
  imports: [
    HttpModule,
    AuthModule,
    TypeOrmModule.forFeature([UserEntity, UserRepository]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
