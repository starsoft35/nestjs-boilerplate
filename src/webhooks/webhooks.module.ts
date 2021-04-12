import { Webhook } from './entities/webhook.entity';
import { HttpModule, Module } from '@nestjs/common';
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
