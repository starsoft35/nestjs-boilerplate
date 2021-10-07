import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Writable } from 'stream';
import { UsersService } from '../users/users.service';
import { User } from './../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ) {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async generate2FASecret(user: User) {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(
      user.email,
      this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'),
      secret,
    );

    await this.usersService.set2FASecret(secret, user.id);

    return {
      secret,
      otpauthUrl,
    };
  }

  public async pipeQrCodeStream(stream: any, otpauthUrl: string) {
    return toFileStream(stream as Writable, otpauthUrl);
  }

  public check2FACode(twoFACode: string, user: User) {
    return authenticator.verify({
      token: twoFACode,
      secret: user.twoFactorAuthenticationSecret,
    });
  }
}
