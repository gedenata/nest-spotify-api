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
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AlbumEntity } from './album.entity';
import { ArtistEntity } from './artist.entity';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => AlbumEntity)
  @JoinColumn()
  album: AlbumEntity;

  @ManyToOne(() => ArtistEntity)
  @JoinColumn()
  artist: ArtistEntity;

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

  @Column()
  @IsString()
  track_id: string;

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
  @IsObject()
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
  preview_url: string | null;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
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
