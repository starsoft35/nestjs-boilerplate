import { ResourceWithOptions } from 'admin-bro';
import passwordFeature from '@admin-bro/passwords'
import * as bcrypt from 'bcrypt';
import { User } from '../../users/entities/user.entity';

const UserResource: ResourceWithOptions = {
  resource: User,
  options: {
    properties: { encryptedPassword: { isVisible: false } },
  },
  features: [passwordFeature({
    properties: {
      password: 'password',
      encryptedPassword: 'password'
    },
    hash: (pass) => bcrypt.hash(pass, 10),
  })]
};

export default UserResource;
