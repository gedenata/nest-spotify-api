import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { UserEntity } from './user.entity';

@Entity()
export class ImageObjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  url: string;

  @Column()
  @IsNumber()
  @Min(1)
  @Max(10000)
  height: number;

  @Column()
  @IsNumber()
  @Min(1)
  @Max(10000)
  width: number;

  @ManyToOne(() => UserEntity, (user) => user.images)
  user: UserEntity;
}
