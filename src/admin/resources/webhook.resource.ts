import { ResourceWithOptions } from 'admin-bro';
import { Webhook } from '../../webhooks/entities/webhook.entity';
import { devNav } from '../navigation';

const WebhookResource: ResourceWithOptions = {
  resource: Webhook,
  options: {
    navigation: devNav
  },
};

export default WebhookResource;
