import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from './user.entity';

@Entity()
export class PlaylistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string | null;

  @Column({ default: true })
  @IsBoolean()
  isPublic: boolean;

  @ManyToMany(() => UserEntity, (user) => user.followedPlaylists)
  @JoinTable()
  followers: UserEntity[];
}
