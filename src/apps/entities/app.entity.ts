import { Account } from 'src/accounts/entities/account.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, RelationId, ManyToOne, Generated } from 'typeorm';

@Entity()
export class App extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @RelationId((app: App) => app.account)
  accountId: Number;

  @ManyToOne(() => Account, account => account.apps)
  account: number;

  @Column()
  name: string;

  @Column()
  @Generated("uuid")
  clientId: string;

  @Column()
  originUrl: string;

  // @Column()
  // secretToken: string;
}
