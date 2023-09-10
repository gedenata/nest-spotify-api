import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserRepositoryModule {}
