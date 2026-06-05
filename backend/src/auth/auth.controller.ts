import { Controller, Post, Body, HttpCode, Req, Res, UnauthorizedException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginLocalUserDto } from './dto/login-local-user.dto';
import { AuthResponse } from './dto/auth-response.dto';
import { RegisterLocalUserDto } from 'src/users/dto/register-local-user.dto';
import { clearRefreshTokenCookie, setRefreshTokenCookie } from './utils/refresh-token-cookie.utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local-login')
  @HttpCode(200)
  async loginLocalUser(
    @Body() loginLocalUserDto: LoginLocalUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const { refreshToken, ...clientResponse } = await this.authService.loginLocalUser(loginLocalUserDto);

    setRefreshTokenCookie(res, refreshToken);

    return clientResponse;
  }

  @Post('local-register')
  @HttpCode(201)
  async registerLocalUser(
    @Body() registerLocalUserDto: RegisterLocalUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const { refreshToken, ...clientResponse } = await this.authService.registerLocalUser(registerLocalUserDto);
    
    setRefreshTokenCookie(res, refreshToken);

    return clientResponse;
  }

  @Post('refresh')
  @HttpCode(200)
  async refreshAccessToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    try {
      const receivedRefreshToken = req.cookies['refresh_token'];

      if (!receivedRefreshToken) {
        throw new UnauthorizedException('Refresh token is missing');
      }

      const { refreshToken, accessToken } = await this.authService.refreshAccessToken(receivedRefreshToken);

      setRefreshTokenCookie(res, refreshToken);

      return { accessToken };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        clearRefreshTokenCookie(res);
      }

      throw error;
    }
  }
}
