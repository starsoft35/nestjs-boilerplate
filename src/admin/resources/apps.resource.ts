import { ResourceWithOptions } from 'admin-bro';

import { App } from '@/apps/entities/app.entity';

import { devNav } from '../navigation';

const AppsResource: ResourceWithOptions = {
  resource: App,
  options: {
    navigation: devNav,
    properties: {
      clientId: {
        isVisible: false,
      },
    },
  },
};

export default AppsResource;
