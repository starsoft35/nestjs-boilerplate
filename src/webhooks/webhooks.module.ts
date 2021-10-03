import { Webhook } from './entities/webhook.entity';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Webhook])],
  exports: [TypeOrmModule, WebhooksService],
  controllers: [WebhooksController],
  providers: [WebhooksService],
})
export class WebhooksModule {}
