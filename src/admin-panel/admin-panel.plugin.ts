import { INestApplication } from '@nestjs/common';
import AdminBro from 'admin-bro';
import * as AdminBroExpress from 'admin-bro-expressjs';
import { Database, Resource } from '@admin-bro/typeorm';

import UserResource from './resources/user.resource';
import AccountResource from './resources/account.resource';

export async function setupAdminPanel(app: INestApplication): Promise<void> {
  AdminBro.registerAdapter({ Database, Resource });

  /** Create adminBro instance */
  const adminBro = new AdminBro({
    resources: [
      AccountResource,
      UserResource
    ],
    rootPath: '/admin',
  });

  const router = AdminBroExpress.buildRouter(adminBro);

  app.use(adminBro.options.rootPath, router);
}
