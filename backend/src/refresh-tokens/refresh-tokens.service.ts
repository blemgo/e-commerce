import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { BinaryToTextEncoding } from 'crypto';
import ms from 'ms';
import { env } from '../config/env';

@Injectable()
export class RefreshTokensService {
    private readonly TOKEN_BYTES = 32;
    private readonly TOKEN_ENCODING: BinaryToTextEncoding = 'hex';
    private readonly HASH_ALGORITHM = 'sha256';

    constructor(
        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepository: Repository<RefreshToken>,
    ) {}

    private generateToken(): string {
        return crypto.randomBytes(this.TOKEN_BYTES).toString(this.TOKEN_ENCODING);
    }

    private hashToken(token: string): string {
        return crypto.createHash(this.HASH_ALGORITHM).update(token).digest(this.TOKEN_ENCODING);
    }

    async createRefreshToken(userId: string): Promise<string> {
        const refreshToken = this.refreshTokenRepository.create({
            user: { id: userId },
            tokenHash: this.hashToken(this.generateToken()),
            expiresAt: new Date(Date.now() + ms(env.REFRESH_TOKEN_EXPIRES_IN)),
        });

        return this.refreshTokenRepository.save(refreshToken).then(token => token.id);
    }

    async revokeTokenByHash(token: string): Promise<void> {
        await this.refreshTokenRepository.update(
            { tokenHash: this.hashToken(token), revoked: false },
            { revoked: true },
        );
    }

    async revokeTokenByUserId(userId: string): Promise<void> {
        await this.refreshTokenRepository.update(
            { user: { id: userId }, revoked: false },
            { revoked: true },
        );
    }

    async reissueToken(token: string): Promise<string> {
        const existing = await this.refreshTokenRepository.findOne({
            where: { tokenHash: this.hashToken(token) },
            relations: { user: true },
        });

        // anti theft
        if (!existing || existing.revoked || existing.expiresAt < new Date()) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }

        // revoke existing token
        await this.refreshTokenRepository.update(existing.id, { revoked: true });

        const newToken = this.hashToken(this.generateToken());

        await this.refreshTokenRepository.save(
            this.refreshTokenRepository.create({
                user: existing.user,
                tokenHash: newToken,
                expiresAt: new Date(Date.now() + ms(env.REFRESH_TOKEN_EXPIRES_IN)),
            }),
        );

        return newToken;
    }
}
