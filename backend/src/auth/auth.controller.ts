import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginLocalUserDto } from './dto/login-local-user.dto';
import { AuthResponse } from './dto/auth-response.dto';
import { RegisterLocalUserDto } from 'src/users/dto/register-local-user.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local-login')
  @HttpCode(200)
  async loginLocalUser(@Body() loginLocalUserDto: LoginLocalUserDto): Promise<AuthResponse> {
    return await this.authService.loginLocalUser(loginLocalUserDto);
  }

  @Post('local-register')
  @HttpCode(201)
  async registerLocalUser(@Body() registerLocalUserDto: RegisterLocalUserDto): Promise<AuthResponse> {
    return await this.authService.registerLocalUser(registerLocalUserDto);
  }

  @Post('refresh')
  @HttpCode(200)
  async refreshAccessToken(@Body() refreshAccessTokenDto: RefreshAccessTokenDto): Promise<AuthResponse> {
    return await this.authService.refreshAccessToken(
      refreshAccessTokenDto.refreshToken,
      refreshAccessTokenDto.accessToken,
    );
  }
}
