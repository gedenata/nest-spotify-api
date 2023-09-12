import { IsInt, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ImageObjectEntity } from './image.entity';

@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { nullable: true })
  @IsOptional()
  @IsUrl()
  external_urls: { spotify: string } | null;

  @Column('jsonb', { nullable: true })
  @IsOptional()
  @IsNumber()
  followers: { href: string | null; total: number } | null;

  @Column()
  @IsString({ each: true })
  genres: string[];

  @Column()
  @IsOptional()
  @IsUrl()
  href: string | null;

  @OneToMany(() => ImageObjectEntity, (image) => image.user, { cascade: true })
  images: ImageObjectEntity[];

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsInt()
  popularity: number;

  @Column()
  @IsString()
  type: string;

  @Column()
  @IsOptional()
  @IsUrl()
  uri: string | null;
}
