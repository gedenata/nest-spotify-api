import {
  Equals,
  IsArray,
  IsBoolean,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EpisodeEntity } from './episode.entity';

@Entity()
export class ShowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: true, type: 'simple-array' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  available_markets: string[];

  @Column({ nullable: true, type: 'jsonb' })
  @IsOptional()
  @IsObject()
  copyrights: {
    text?: string;
    type?: string;
  };

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  description: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  html_description: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsBoolean()
  explicit: boolean;

  @Column({ nullable: true, type: 'jsonb' })
  @IsOptional()
  @IsObject()
  external_urls: {
    spotify: string;
  };

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  href: string;

  @Column()
  @IsString()
  show_id: string;

  @Column({ nullable: true, type: 'jsonb' })
  @IsOptional()
  @IsObject()
  @IsArray()
  images: {
    url: string;
    height?: number;
    width?: number;
  }[];

  @Column({ nullable: true })
  @IsOptional()
  @IsBoolean()
  is_externally_hosted: boolean;

  @Column({ nullable: true, type: 'simple-array' })
  @IsOptional()
  @IsString()
  @IsArray({ each: true })
  languages: string[];

  @Column()
  @IsString()
  media_type: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  publisher: string;

  @Column({ nullable: true, default: 'track' })
  @Equals('track')
  @IsOptional()
  @IsString()
  type: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  uri: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  total_episodes: number;

  @Column({ nullable: true, type: 'jsonb' })
  @IsOptional()
  @IsObject()
  episodes: {
    href?: string;
    limit?: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };

  @OneToMany(() => EpisodeEntity, (episode) => episode.show)
  @IsArray()
  items: EpisodeEntity[];
}
