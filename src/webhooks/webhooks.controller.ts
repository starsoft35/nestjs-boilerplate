import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthGuard } from '../auth/guards/auth.guard';
import { WebhooksService } from './webhooks.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { WebhookEvent } from './events/webhook.event';
import { Webhook } from './entities/webhook.entity';

/**
 * App are used for developers
 */
@ApiTags('Webhooks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Crud({
  model: {
    type: Webhook,
  },
  dto: {
    create: CreateWebhookDto,
    update: CreateWebhookDto,
    replace: CreateWebhookDto,
  },
  query: {
    join: {
      account: {
        eager: true,
      }
    }
  }
})
@Controller('webhooks')
export class WebhooksController {
  constructor(public service: WebhooksService) {}

  /**
   * Trigger webhook callback
   */
  @OnEvent('webhook')
  async triggerWebhook(event: WebhookEvent) {
    return this.service.callWebhook(event);
  }
}
