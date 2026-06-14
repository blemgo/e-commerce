import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  Req,
  Res,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginLocalUserDto } from './dto/login-local-user.dto';
import { AuthorizedUser } from './dto/authorized-user.dto';
import { RegisterLocalUserDto } from 'src/users/dto/register-local-user.dto';
import {
  clearRefreshTokenCookie,
  setRefreshTokenCookie,
} from './utils/refresh-token-cookie.utils';
import {
  clearAccessTokenCookie,
  setAccessTokenCookie,
} from './utils/access-token-cookie.utils';
import { User } from 'src/users/entities/user.entity';
import { env } from 'src/config/env';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local-login')
  @HttpCode(200)
  async loginLocalUser(
    @Body() loginLocalUserDto: LoginLocalUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthorizedUser> {
    const { refreshToken, accessToken, user } =
      await this.authService.loginLocalUser(loginLocalUserDto);

    setRefreshTokenCookie(res, refreshToken);
    setAccessTokenCookie(res, accessToken);

    return user;
  }

  @Post('local-register')
  @HttpCode(201)
  async registerLocalUser(
    @Body() registerLocalUserDto: RegisterLocalUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthorizedUser> {
    const { refreshToken, accessToken, user } =
      await this.authService.registerLocalUser(registerLocalUserDto);

    setRefreshTokenCookie(res, refreshToken);
    setAccessTokenCookie(res, accessToken);

    return user;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin(): void {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const { refreshToken, accessToken } =
      await this.authService.loginGoogleUser(req.user as User);

    setRefreshTokenCookie(res, refreshToken);
    setAccessTokenCookie(res, accessToken);

    res.redirect(`${env.FRONTEND_URL}/`);
  }

  @Post('refresh')
  @HttpCode(200)
  async refreshAccessToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthorizedUser> {
    try {
      const receivedRefreshToken = req.cookies['refresh_token'];

      if (!receivedRefreshToken) {
        throw new UnauthorizedException('Refresh token is missing');
      }

      const { refreshToken, accessToken, user } =
        await this.authService.refreshAccessToken(receivedRefreshToken);

      setRefreshTokenCookie(res, refreshToken);
      setAccessTokenCookie(res, accessToken);

      return user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        clearRefreshTokenCookie(res);
        clearAccessTokenCookie(res);
      }

      throw error;
    }
  }

  @Post('logout')
  @HttpCode(200)
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const refreshToken = req.cookies['refresh_token'];

    if (refreshToken) {
      await this.authService.logout(refreshToken);
    }

    clearRefreshTokenCookie(res);
    clearAccessTokenCookie(res);
  }
}
