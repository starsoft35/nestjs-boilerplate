import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column({ default: false })
  twoFactor: boolean;
}
