import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppMailerService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: configService.get('MAILER_TRANSPORT'),
        defaults: {
          from: '"nestjsboilerplate" <noreply@netsjsboilerplate.com>',
        },
        // template: {
        //   dir: __dirname + '/templates',
        //   adapter: new HandlebarsAdapter(),
        //   options: {
        //     strict: true,
        //   },
        // },
      }),
    }),
  ],
  providers: [AppMailerService],
  exports: [AppMailerService],
})
export class AppMailerModule {}
