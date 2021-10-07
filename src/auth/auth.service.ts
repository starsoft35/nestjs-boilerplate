import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Writable } from 'stream';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { AppMailerService } from '../mailer/mailer.service';
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: AppMailerService,
  ) {}

  /**
   * Validate user on classic login
   */
  async validateUser(
    email: string,
    pass: string,
  ) {
    const user = await this.usersService.findOne({ where: { email } });

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    } else {
      return null;
    }
  }

  /**
   * Generate JWT token from basic login
   */
  login(user: User) {
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        id: user.id,
      }),
    };
  }

  public async generate2FASecret(user: User) {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(
      user.email,
      this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'),
      secret,
    );

    await this.usersService.set2FASecret(user.id, secret);

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

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      } else {
        throw new BadRequestException();
      }
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      } else {
        throw new BadRequestException('Bad confirmation token');
      }
    }
  }

  public sendVerificationLink(email: string) {
    const token = this.jwtService.sign({ email }, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES')
    });

    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;
    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

    return this.emailService.sendMail({
      to: email,
      subject: 'Email confirmation',
      text,
    })
  }

  public async confirmEmail(req: CrudRequest, email: string) {
    const user = await this.usersService.findOne({ where: { email } });

    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }

    await this.usersService.confirmUserEMail(user.id);
  }
}
