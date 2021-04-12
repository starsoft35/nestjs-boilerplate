import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@ApiTags('Accounts')
@ApiBearerAuth()
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  /**
   * Create an Account -> User relationship
   */
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  /**
   * Get all Account -> User relationship
   */
  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  /**
   * Get an Account -> User relationship
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Account> {
    return this.accountsService.findOne(+id);
  }

  /**
   * Update an Account -> User relationship
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  /**
   * Delete an Account -> User relationship
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }

  /**
   * Create an Account Reference
   */
  @Post('refs')
  createRef(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  /**
   * Get all Account References
   */
  @Get('refs')
  findAllRef() {
    return this.accountsService.findAllRef();
  }

  /**
   * Get an Account Reference
   */
  @Get('refs/:id')
  findOneRef(@Param('id') id: string) {
    return this.accountsService.findOneRef(+id);
  }

  /**
   * Update an Account Reference
   */
  @Patch('refs/:id')
  updateRef(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountsService.updateRef(+id, updateAccountDto);
  }

  /**
   * Delete an Account Reference
   */
  @Delete('refs/:id')
  removeRef(@Param('id') id: string) {
    return this.accountsService.removeRef(+id);
  }
}
