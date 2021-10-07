import { Webhook } from './../../webhooks/entities/webhook.entity';
import { App } from './../../apps/entities/app.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => User, user => user.account)
  users: User[];

  @OneToMany(() => App, app => app.account)
  apps: App[];

  @OneToMany(() => Webhook, webhook => webhook.account)
  webhooks: Webhook[];
}
