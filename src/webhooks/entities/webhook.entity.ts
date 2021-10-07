import { Account } from 'src/accounts/entities/account.entity';
import { Entity, Column, PrimaryGeneratedColumn, Index, BaseEntity, RelationId, ManyToOne } from 'typeorm';

@Entity()
export class Webhook extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name: string;

  @Column()
  callbackUrl: string;

  @Column()
  @RelationId((webhook: Webhook) => webhook.account)
  accountId: Number;

  @ManyToOne(() => Account, account => account.webhooks)
  account: Account;
}
