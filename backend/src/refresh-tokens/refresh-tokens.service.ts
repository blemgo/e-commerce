import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { DataSource, Repository } from 'typeorm';
import * as crypto from 'crypto';
import { BinaryToTextEncoding } from 'crypto';
import ms from 'ms';
import { env } from '../config/env';
import { AuthorizedUser } from 'src/auth/dto/authorized-user.dto';
import { userToAuthorizedUser } from 'src/auth/utils/userToAuthorizedUser';

@Injectable()
export class RefreshTokensService {
    private readonly TOKEN_BYTES = 32;
    private readonly TOKEN_ENCODING: BinaryToTextEncoding = 'hex';
    private readonly HASH_ALGORITHM = 'sha256';

    constructor(
        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepository: Repository<RefreshToken>,
        private readonly dataSource: DataSource,
    ) {}

    private generateToken(): string {
        return crypto.randomBytes(this.TOKEN_BYTES).toString(this.TOKEN_ENCODING);
    }

    private hashToken(token: string): string {
        return crypto.createHash(this.HASH_ALGORITHM).update(token).digest(this.TOKEN_ENCODING);
    }

    async createRefreshToken(userId: string): Promise<string> {
        const rawToken = this.generateToken();

        await this.refreshTokenRepository.save(
            this.refreshTokenRepository.create({
                user: { id: userId },
                tokenHash: this.hashToken(rawToken),
                expiresAt: new Date(Date.now() + ms(env.REFRESH_TOKEN_EXPIRES_IN)),
            }),
        );

        return rawToken;
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

    async reissueToken(token: string): Promise<{ refreshToken: string; user: AuthorizedUser }> {
        let revokeAllForUserId: string | null = null;

        try {
            // transaction to avoid revoking token without creating a new one
            return await this.dataSource.transaction(async (db) => {
                const existing = await db.findOne(RefreshToken, {
                    where: { tokenHash: this.hashToken(token) },
                    relations: { user: true },
                    lock: { mode: 'pessimistic_write' },
                });
                
                // anti theft measure
                if (existing?.revoked) {
                    revokeAllForUserId = existing.user.id;

                    throw new UnauthorizedException('Invalid or expired refresh token');
                }
                
                if (!existing || existing.expiresAt < new Date()) {
                    throw new UnauthorizedException('Invalid or expired refresh token');
                }


                // revoke old token
                await db.update(RefreshToken, existing.id, { revoked: true });

                const rawToken = this.generateToken();

                // create new token
                await db.save(db.create(RefreshToken, {
                    user: existing.user,
                    tokenHash: this.hashToken(rawToken),
                    expiresAt: new Date(Date.now() + ms(env.REFRESH_TOKEN_EXPIRES_IN)),
                }));

                return { refreshToken: rawToken, user: userToAuthorizedUser(existing.user) };
            });
        } finally {
            if (revokeAllForUserId) {
                try {
                    await this.revokeTokenByUserId(revokeAllForUserId);
                } catch (error) {
                    // prevent impacting the original error 
                }
            }
        }
    }
}
