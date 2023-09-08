import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ImageObject } from './image.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 2, nullable: true })
  country: string | null;

  @Column({ length: 255 })
  display_name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column('jsonb', { default: { filter_enabled: false, filter_locked: false } })
  explicit_content: { filter_enabled: boolean; filter_locked: boolean };

  @Column('jsonb', { nullable: true })
  external_urls: { spotify: string };

  @Column({ length: 255, nullable: true })
  href: string | null;

  @Column({ length: 255 })
  spotifyId: string;

  @Column('jsonb', { nullable: true })
  followers: { href: string | null; total: number } | null;

  @OneToMany(() => ImageObject, (image) => image.user, { cascade: true })
  images: ImageObject[];

  @Column({ length: 255, nullable: true })
  product: string;

  @Column({ length: 255 })
  type: string;

  @Column({ length: 255, nullable: true })
  uri: string;
}
