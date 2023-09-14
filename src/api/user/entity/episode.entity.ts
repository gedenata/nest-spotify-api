import {
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EpisodeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  audio_preview_url: string;

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
  @IsInt()
  @Min(0)
  duration_ms: number;

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
  episode_id: string;

  @Column({ nullable: true, type: 'jsonb' })
  @IsOptional()
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

  @Column({ nullable: true })
  @IsOptional()
  @IsBoolean()
  is_playable: boolean;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  // @Deprecated
  language: string;

  @Column({ nullable: true, type: 'simple-array' })
  @IsOptional()
  @IsString()
  @IsArray({ each: true })
  languages: string[] | null;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsString()
  release_date: string;

  @Column({ nullable: true })
  @IsString()
  @IsIn(['year', 'month', 'day'])
  release_date_precision: string;

  @Column({ nullable: true, type: 'jsonb' })
  @IsOptional()
  @IsObject()
  resume_point: {
    fully_played: boolean;
    resume_position_ms: number;
  };

  @Column()
  @IsString()
  @IsIn(['episode'])
  type: string;

  @Column({ nullable: true, type: 'jsonb' })
  @IsOptional()
  @IsObject()
  restrictions: {
    reason: string;
  };

  @Column({ nullable: true, type: 'jsonb' })
  @IsOptional()
  @IsObject()
  show: {
    available_markets?: string[];
    copyrights: {
      text?: string;
      type?: string;
    };
    description?: string;
    html_description?: string;
    explicit?: boolean;
    external_urls: {
      spotify?: string;
    };
    href?: string;
    show_id?: string;
    images: {
      url?: string;
      height?: number;
      width?: number;
    }[];
    is_externally_hosted?: boolean;
    languages?: string[];
    media_type?: string;
    name?: string;
    publisher?: string;
    type?: string;
    uri?: string;
    total_episodes?: number;
  };
}
