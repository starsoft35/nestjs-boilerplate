import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  HttpService,
} from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { Roles } from 'src/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OnEvent } from '@nestjs/event-emitter';
import { WebhookEvent } from './events/webhook.event';

/**
 * App are used for developers
 */
@ApiTags('Webhooks')
@ApiBearerAuth()
@Controller('webhooks')
export class WebhooksController {
  constructor(
    private readonly webhooksService: WebhooksService,
    private httpService: HttpService,
  ) {}

  /**
   * Create an Webhook setup
   */
  @Roles('admin')
  @Post()
  createOrUpdate(@Body() createWebhookDto: CreateWebhookDto, @Request() req) {
    return this.webhooksService.createOrUpdate(createWebhookDto, req.user);
  }

  /**
   * Get all Webhook setups
   */
  @Roles('admin')
  @Get()
  findAll() {
    return this.webhooksService.findAll();
  }

  @OnEvent('webhook')
  async triggerWebhook(event: WebhookEvent) {
    return this.webhooksService.callWebhook(event);
  }
}
