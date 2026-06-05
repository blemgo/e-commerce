import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginLocalUserDto } from './dto/login-local-user.dto';
import { RegisterLocalUserDto } from 'src/users/dto/register-local-user.dto';
import { AuthResult } from './types/auth-result';
import { AuthorizedUser } from './dto/authorized-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { userToAuthorizedUser } from './utils/userToAuthorizedUser';
import { JwtPayload } from './types/jwt-payload.interface';
import { RefreshTokensService } from 'src/refresh-tokens/refresh-tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly refreshTokensService: RefreshTokensService,
  ) {}

  async loginLocalUser(loginLocalUserDto: LoginLocalUserDto): Promise<AuthResult> {
    let user: User | null = null;

    try {
      user = await this.usersService.getUserByEmail(loginLocalUserDto.email);
    } catch (error) {
      // avoid leaking information about the existence of the email + prevent false error info
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException('Invalid email or password');
      }
      
      throw error;
    }

    if (user.passwordHash && await bcrypt.compare(loginLocalUserDto.password, user.passwordHash)) {
      const { accessToken, refreshToken } = await this.generateTokens(userToAuthorizedUser(user));

      return { accessToken, refreshToken, user: userToAuthorizedUser(user) };
    }

    throw new UnauthorizedException('Invalid email or password');
  } 

  async registerLocalUser(registerLocalUserDto: RegisterLocalUserDto): Promise<AuthResult> {
    const user = await this.usersService.createLocalUser(registerLocalUserDto);
    const authorizedUser = userToAuthorizedUser(user);
    const { accessToken, refreshToken } = await this.generateTokens(authorizedUser);

    return { accessToken, refreshToken, user: authorizedUser };
  }

  async refreshAccessToken(oldRefreshToken: string): Promise<AuthResult> {
    const { refreshToken, user } = await this.refreshTokensService.reissueToken(oldRefreshToken);

    return {
      accessToken: await this.signToken(user),
      refreshToken,
      user,
    };
  }

  private async generateTokens(user: AuthorizedUser): Promise<{ accessToken: string, refreshToken: string }> {
    const accessToken = await this.signToken(user);
    const refreshToken = await this.refreshTokensService.createRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  private async signToken(authorizedUser: AuthorizedUser): Promise<string> {
    const payload: JwtPayload = {
      sub: authorizedUser.id,
      email: authorizedUser.email,
      fullName: authorizedUser.fullName,
      role: authorizedUser.role,
    };

    return this.jwtService.sign(payload);
  }
}
