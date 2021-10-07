import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppMailerService {
  constructor(private readonly mailerService: MailerService) { }

  sendMail(options: ISendMailOptions) {
    return this.mailerService.sendMail(options);
  }
}
