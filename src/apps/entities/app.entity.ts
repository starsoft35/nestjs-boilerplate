import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class App {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountId: number;

  @Column()
  name: string;

  @Column()
  clientId: string;

  @Column()
  originUrl: string;

  @Column()
  secretToken: string;
}
