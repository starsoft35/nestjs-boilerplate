import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async registerUser(registerDto: RegisterDto) {
    const result = await this.findOne(registerDto.email);

    if (result) {
      throw new ConflictException();
    } else {
      const newUser = await this.usersRepository.create({
        email: registerDto.email,
        password: await bcrypt.hash(registerDto.password, 10),
      });

      return this.usersRepository.save(newUser);
    }
  }

  async createUser(userCreateDto: UserCreateDto) {
    const result = await this.findOne(userCreateDto.email);

    if (result) {
      throw new ConflictException();
    } else {
      const newUser = await this.usersRepository.create(userCreateDto);
      return this.usersRepository.save(newUser);
    }
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(email: string) {
    const result = await this.usersRepository.find({ where: { email } });
    return result.length ? result[0] : undefined;
  }

  async findOneById(userId: User['id']) {
    return this.usersRepository.findOne(userId);
  }

  async updateProfile(userId: User['id'], partialUser: Partial<User>) {
    const { id, ...updateUser } = partialUser;

    await this.usersRepository.update({ id: userId }, updateUser);
    return await this.usersRepository.findOne(userId);
  }

  deleteProfile(userId: User['id']) {
    return this.usersRepository.delete(userId);
  }
}
