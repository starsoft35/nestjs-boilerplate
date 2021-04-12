import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class App {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  clientId: string;

  @Column()
  appUrl: string;

  @Column()
  secretToken: string;
}
