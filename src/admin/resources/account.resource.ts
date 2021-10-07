import { ResourceWithOptions } from 'admin-bro';
import { mainNav } from '../navigation';
import { Account } from './../../accounts/entities/account.entity';

const AccountResource: ResourceWithOptions = {
  resource: Account,
  options: {
    navigation: mainNav,
  },
};

export default AccountResource;
