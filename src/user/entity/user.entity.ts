import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {
  IsOptional,
  IsString,
  IsEmail,
  IsBoolean,
  IsUrl,
  IsNumber,
} from 'class-validator';
import { ImageObjectEntity } from './image.entity';
import { PlaylistEntity } from './playlist.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 2, nullable: true })
  @IsOptional()
  @IsString()
  country: string | null;

  @Column({ length: 255 })
  @IsString()
  display_name: string;

  @Column({ length: 255, unique: true })
  @IsEmail()
  email: string;

  @Column('jsonb', { default: { filter_enabled: false, filter_locked: false } })
  @IsBoolean()
  explicit_content: { filter_enabled: boolean; filter_locked: boolean };

  @Column('jsonb', { nullable: true })
  @IsOptional()
  @IsUrl()
  external_urls: { spotify: string } | null;

  @Column({ length: 255, nullable: true })
  @IsOptional()
  @IsUrl()
  href: string | null;

  @Column()
  @IsString()
  user_id: string;

  @Column('jsonb', { nullable: true })
  @IsOptional()
  @IsNumber()
  followers: { href: string | null; total: number } | null;

  @OneToMany(() => ImageObjectEntity, (image) => image.user, { cascade: true })
  images: ImageObjectEntity[];

  @Column({ length: 255, nullable: true })
  @IsOptional()
  @IsString()
  product: string | null;

  @Column({ length: 255 })
  @IsString()
  type: string;

  @Column({ length: 255, nullable: true })
  @IsOptional()
  @IsUrl()
  uri: string | null;

  @ManyToMany(() => PlaylistEntity)
  @JoinTable()
  followedPlaylists: string[];

  @ManyToMany(() => PlaylistEntity)
  @JoinTable()
  publicFollowedPlaylists: string[];
}
