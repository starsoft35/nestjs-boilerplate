import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }

  async registerUser(registerDto: RegisterDto) {
    const result = await this.findByEmail(registerDto.email)

    if (result) {
      throw new ConflictException();
    } else {
      const newUser = await this.repo.create({
        email: registerDto.email,
        password: await bcrypt.hash(registerDto.password, 10),
      });

      return this.repo.save(newUser);
    }
  }

  async findByEmail(email: string) {
    const users = await this.repo.find({ where: { email } })
    return users.length ? users[0] : null
  }

  async set2FASecret(secret: string, userId: number) {
    return this.repo.update(userId, {
      twoFactorAuthenticationSecret: secret,
    });
  }
}
