import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
    if (err || !user) {
      this.logger.warn(`JWT validation failed: ${info?.message ?? 'unknown reason'}`);
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
