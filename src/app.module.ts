import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';

import { DatabaseModule} from './database/database.module';
import { AppMailerModule } from './mailer/mailer.module';
import { AppAdminModule } from './admin/admin.module';
import { AccountsModule } from './accounts/accounts.module';
import { AppsModule } from './apps/apps.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WebhooksModule } from './webhooks/webhooks.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    AppMailerModule,
    AppAdminModule,
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
