import {
  Equals,
  IsArray,
  IsBoolean,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'jsonb' })
  @IsOptional()
  @IsObject()
  album: {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: {
      reason: string;
    };
    type: string;
    uri: string;
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
  };

  @Column({ nullable: true, type: 'jsonb' })
  @IsOptional()
  @IsObject()
  artists: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
  };

  @Column({ nullable: true, type: 'simple-array' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  available_markets: string[];

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  disc_number: number;

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
  external_ids: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };

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

  @Column({ nullable: true })
  @IsOptional()
  @IsBoolean()
  is_playable: boolean;

  @Column('simple-json', { nullable: true })
  @IsOptional()
  linked_from: {
    external_urls: { spotify: string } | null;
    href: string;
    id: string;
    type: string;
    uri: string | null;
  };

  @Column({ nullable: true, type: 'jsonb' })
  @IsOptional()
  restrictions: {
    reason: string;
  };

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  popularity: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @IsUrl()
  preview_url: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  track_number: number;

  @Column({ default: 'track' })
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
  @IsBoolean()
  is_local: boolean;
}
