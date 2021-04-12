import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { CreateAccountRefDto } from './dto/create-accountRef.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { AccountRef } from './entities/accountRefs.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(AccountRef)
    private accountRefRepository: Repository<AccountRef>,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }

  findAll() {
    return this.accountRepository.find();
  }

  findOne(id: number) {
    return this.accountRepository.findOne(id);
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return this.accountRepository.delete(id);
  }

  createRef(createAccountRefDto: CreateAccountRefDto) {
    return 'This action adds a new account';
  }

  findAllRef() {
    return this.accountRefRepository.find();
  }

  findOneRef(id: number) {
    return `This action returns a #${id} account`;
  }

  updateRef(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  removeRef(id: number) {
    return this.accountRefRepository.delete(id);
  }
}
