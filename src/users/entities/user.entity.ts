import { Entity, Column, PrimaryGeneratedColumn, Index, JoinColumn, ManyToOne, BeforeUpdate } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Account } from './../../accounts/entities/account.entity';

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

  @Column({ nullable: true })
  twoFactorAuthenticationSecret: string;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'timestamptz', default: () => "now()" })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => "now()" })
  updatedAt: Date;

  @Column({ type: 'timestamptz', default: () => "now()" })
  lastLogin: Date;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @ManyToOne(() => Account, account => account.users)
  account: Account;
}
