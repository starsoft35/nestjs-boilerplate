import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Request,
  Param,
  Delete,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles.decorator';
import { WebhookEvent } from 'src/webhooks/events/webhook.event';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private eventEmitter: EventEmitter2,
  ) {}

  /**
   * Create a User
   */
  @Post()
  async register(@Body() userCreateDto: UserCreateDto) {
    const user = await this.usersService.createUser(userCreateDto);
    return user;
  }

  /**
   * Get the users
   */
  @Roles('admin')
  @Get()
  async getUsers() {
    const users = await this.usersService.findAll();

    this.eventEmitter.emit(
      'webhook',
      new WebhookEvent({
        name: 'user.getAll',
        accountId: 1,
        payload: {},
      }),
    );

    return users;
  }

  /**
   * Get a user
   */
  @Roles('admin')
  @Get(':id')
  async getUser(@Param('id') userId: User['id']) {
    const user = await this.usersService.findOneById(userId);
    return user;
  }

  /**
   * Update a User
   */
  @Roles('admin')
  @Patch(':id')
  updateProfile(@Body() body: Partial<User>, @Param('id') userId: User['id']) {
    return this.usersService.updateProfile(userId, body);
  }

  /**
   * Delete a User
   */
  @Roles('admin')
  @Delete(':id')
  async deleteProfile(@Param('id') userId: User['id']): Promise<string> {
    await this.usersService.deleteProfile(userId);

    this.eventEmitter.emit(
      'webhook',
      new WebhookEvent({
        name: 'user.delete',
        accountId: 1,
        payload: {
          userId,
        },
      }),
    );

    return 'User deleted';
  }

  /**
   * Get the current user profile
   */
  @Roles('user')
  @Get('me')
  getMeProfile(@Request() req) {
    return this.usersService.findOneById(req.user.id);
  }

  /**
   * Update the current user profile
   */
  @Roles('user')
  @Patch('me')
  updateMeProfile(@Request() req, @Body() body: Partial<User>) {
    return this.usersService.updateProfile(req.user.id, body);
  }

  /**
   * Delete the current user profile
   */
  @Roles('user')
  @Delete('me')
  async deleteMeProfile(@Request() req): Promise<string> {
    await this.usersService.deleteProfile(req.user.id);

    this.eventEmitter.emit(
      'webhook',
      new WebhookEvent({
        name: 'user.delete',
        accountId: 1,
        payload: {
          userId: req.user.id,
        },
      }),
    );

    return 'User deleted';
  }
}
