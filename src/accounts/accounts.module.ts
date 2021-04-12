import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Account } from './entities/account.entity';
import { AccountRef } from './entities/accountRefs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, AccountRef])],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
