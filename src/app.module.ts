import { Webhook } from './webhooks/entities/webhook.entity';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { WebhooksModule } from './webhooks/webhooks.module';
import { AccountsModule } from './accounts/accounts.module';
import { Account } from './accounts/entities/account.entity';
import { AppsModule } from './apps/apps.module';
import { App } from './apps/entities/app.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE_NAME'),
        entities: [App, Account, User, Webhook],
        synchronize: true,
        logging: true,
      }),
    }),
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      defaults: {
        from: '"nestjsboilerplate" <noreply@netsjsboilerplate.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    AccountsModule,
    AppsModule,
    AuthModule,
    UsersModule,
    WebhooksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
