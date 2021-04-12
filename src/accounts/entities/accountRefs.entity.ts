import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AccountRef {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
