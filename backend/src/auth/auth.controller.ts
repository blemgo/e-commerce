import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthorizedUser } from './dto/authorized-user.dto';
import { LoginLocalUserDto } from './dto/login-local-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local-login')
  @HttpCode(200)
  async loginLocalUser(@Body() loginLocalUserDto: LoginLocalUserDto): Promise<AuthorizedUser> {
    return await this.authService.loginLocalUser(loginLocalUserDto);
  }
}
