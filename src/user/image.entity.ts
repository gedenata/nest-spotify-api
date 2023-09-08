import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ImageObject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  height: number;

  @Column()
  width: number;

  @ManyToOne(() => User, (user) => user.images)
  user: User;
}
