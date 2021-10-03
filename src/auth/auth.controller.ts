import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Register a User
   */
  @Post('auth/register')
  register(@Body() registerDto: RegisterDto) {
    return this.usersService.registerUser(registerDto);
  }

  /**
   * Authenticate a User
   */
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * Generate 2FA Qr Code
   */
  @UseGuards(JwtAuthGuard)
  @Post('auth/2fa/generate')
  async genQrCode(@Res() response: Response, @Req() request: any) {
    const { otpauthUrl } = await this.authService.generate2FASecret(
      request.user,
    );

    return this.authService.pipeQrCodeStream(response, otpauthUrl);
  }
}
