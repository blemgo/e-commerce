import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginLocalUserDto } from './dto/login-local-user.dto';
import { AuthorizedUser } from './dto/authorized-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async loginLocalUser(loginLocalUserDto: LoginLocalUserDto): Promise<AuthorizedUser> {
    let user: User | null = null;

    try {
      user = await this.usersService.getUserByEmail(loginLocalUserDto.email);
    } catch (error) {
      // Avoid leaking information about the existence of the email + prevent false error info.
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException('Invalid email or password');
      }
      
      throw error;
    }

    if (user.passwordHash && await bcrypt.compare(loginLocalUserDto.password, user.passwordHash)) {
      return {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      };
    }

    throw new UnauthorizedException('Invalid email or password');
  } 
}
