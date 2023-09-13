import {
  IsArray,
  IsIn,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ArtistEntity } from './artist.entity';

@Entity()
export class AlbumEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsIn(['album', 'single', 'compilation'])
  album_type: string;

  @Column()
  @IsInt()
  @Min(1)
  total_tracks: number;

  @Column({ type: 'simple-array' })
  @IsArray()
  @IsString({ each: true })
  available_market: string[];

  @Column({ nullable: true, type: 'jsonb' })
  @IsOptional()
  @IsObject()
  external_urls: {
    spotify: string;
  };

  @Column()
  @IsString()
  href: string;

  @Column()
  @IsString()
  album_id: string;

  @Column({ nullable: true, type: 'jsonb' })
  @IsOptional()
  @IsArray()
  images: {
    url: string;
    height?: number;
    width?: number;
  }[];

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  release_date: string;

  @Column()
  @IsString()
  @IsIn(['year', 'month', 'day'])
  release_date_precision: string;

  @Column({ nullable: true, type: 'jsonb' })
  @IsOptional()
  @IsObject()
  restrictions: {
    reason: string;
  };

  @Column()
  @IsString()
  @IsIn(['album'])
  type: string;

  @Column()
  @IsString()
  @IsUrl()
  uri: string;

  @OneToOne(() => ArtistEntity)
  @JoinColumn()
  artist: ArtistEntity;
}
