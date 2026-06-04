import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginLocalUserDto } from './dto/login-local-user.dto';
import { RegisterLocalUserDto } from 'src/users/dto/register-local-user.dto';
import { AuthResponse } from './dto/auth-response.dto';
import { AuthorizedUser } from './dto/authorized-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { userToAuthorizedUser } from './utils/userToAuthorizedUser';
import { JwtPayload } from './types/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async loginLocalUser(loginLocalUserDto: LoginLocalUserDto): Promise<AuthResponse> {
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
      const token = await this.signToken(user);

      return { accessToken: token, user: userToAuthorizedUser(user) };
    }

    throw new UnauthorizedException('Invalid email or password');
  } 

  async registerLocalUser(registerLocalUserDto: RegisterLocalUserDto): Promise<AuthResponse> {
    const user = await this.usersService.createLocalUser(registerLocalUserDto);
    const authorizedUser = userToAuthorizedUser(user);

    return { accessToken: await this.signToken(authorizedUser), user: authorizedUser };
  }

  private async signToken(authorizedUser: AuthorizedUser): Promise<string> {
    const payload: JwtPayload = { sub: authorizedUser.id, email: authorizedUser.email, role: authorizedUser.role };

    return this.jwtService.sign(payload);
  }
}
