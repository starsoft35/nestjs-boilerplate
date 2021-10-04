import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiTags('Accounts')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Crud({
  model: {
    type: Account,
  },
  dto: {
    create: CreateAccountDto,
    update: UpdateAccountDto,
    replace: UpdateAccountDto,
  },
  query: {
    join: {
      users: {
        eager: true,
      }
    }
  }
})
@Controller('accounts')
export class AccountsController implements CrudController<Account> {
  constructor(public service: AccountsService) { }
}
