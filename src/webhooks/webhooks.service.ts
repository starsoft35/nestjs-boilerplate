import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Webhook } from './entities/webhook.entity';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { WebhookEvent } from './events/webhook.event';

@Injectable()
export class WebhooksService {
  constructor(
    @InjectRepository(Webhook)
    private webhookRepository: Repository<Webhook>,
    private httpService: HttpService,
  ) {}

  async createOrUpdate(createWebhookDto: CreateWebhookDto, user: User) {
    const newWebhook = await this.webhookRepository.save({
      ...createWebhookDto,
      accountId: 1,
    });

    return this.webhookRepository.save(newWebhook);
  }

  findAll() {
    return this.webhookRepository.find();
  }

  async findOne({ name, accountId }) {
    const webhook = await this.webhookRepository.find({
      where: {
        name,
        accountId,
      },
    });

    return webhook.length ? webhook[0] : undefined;
  }

  async callWebhook({ name, accountId, payload }: WebhookEvent) {
    const webhook = await this.webhookRepository.find({
      where: {
        name,
        accountId,
      },
    });

    if (webhook.length && webhook[0].callbackUrl) {
      return this.httpService
        .post(webhook[0].callbackUrl, { webhook: name, payload })
        .toPromise();
    }
  }
}
