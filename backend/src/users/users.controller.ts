import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterLocalUserDto } from './dto/register-local-user.dto';
import { AuthorizedUser } from 'src/auth/dto/authorized-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post('register-local')
  @HttpCode(201)
  async registerLocalUser(@Body() registerLocalUserDto: RegisterLocalUserDto): Promise<AuthorizedUser> {
    return await this.usersService.registerLocalUser(registerLocalUserDto);
  }
}
