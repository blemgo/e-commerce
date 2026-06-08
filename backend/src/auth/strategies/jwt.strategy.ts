import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';
import { env } from 'src/config/env';
import { JwtPayload } from '../types/jwt-payload.interface';
import { AuthorizedUser } from '../dto/authorized-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req?.cookies?.['access_token'] ?? null,
            ]),
            ignoreExpiration: false,
            secretOrKey: env.JWT_SECRET,
            algorithms: ['HS256'],
        });
    }

    validate(payload: JwtPayload): AuthorizedUser {
        return {
            id: payload.sub,
            email: payload.email,
            fullName: payload.fullName,
            role: payload.role,
        };
    }
}
