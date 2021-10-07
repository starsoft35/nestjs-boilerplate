import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthGuard } from '../auth/guards/auth.guard';
// import { WebhookInterceptor } from '../webhooks/webhook.interceptor';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
// @UseInterceptors(new WebhookInterceptor('tetetetetete'))
@UseGuards(AuthGuard)
@Crud({
  model: {
    type: User,
  },
  dto: {
    create: UserCreateDto,
    update: UserCreateDto,
    replace: UserCreateDto,
  },
  query:{
    join:{
      account: {
        eager: true,
      }
    }
  }
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(
    public service: UsersService
  ) { }
}
