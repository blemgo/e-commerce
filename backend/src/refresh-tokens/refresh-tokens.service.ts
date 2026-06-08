import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { DataSource, Repository } from 'typeorm';
import * as crypto from 'crypto';
import { BinaryToTextEncoding } from 'crypto';
import { AuthorizedUser } from 'src/auth/dto/authorized-user.dto';
import { userToAuthorizedUser } from 'src/auth/utils/userToAuthorizedUser';

const PERSISTENT_PREFIX = 'p.';

@Injectable()
export class RefreshTokensService {
    private readonly logger = new Logger(RefreshTokensService.name);
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

    private encodeToken(rawToken: string, persistent: boolean): string {
        return persistent ? `${PERSISTENT_PREFIX}${rawToken}` : rawToken;
    }

    private decodeToken(token: string): { rawToken: string; persistent: boolean } {
        const persistent = token.startsWith(PERSISTENT_PREFIX);
        const rawToken = persistent ? token.slice(PERSISTENT_PREFIX.length) : token;

        return { rawToken, persistent };
    }

    async createRefreshToken(userId: string, persistent = false): Promise<string> {
        const rawToken = this.generateToken();
        const encodedToken = this.encodeToken(rawToken, persistent);

        await this.refreshTokenRepository.save(
            this.refreshTokenRepository.create({
                user: { id: userId },
                tokenHash: this.hashToken(encodedToken),
            }),
        );

        return encodedToken;
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
        const { persistent } = this.decodeToken(token);
        let revokeAllForUserId: string | null = null;

        try {
            return await this.dataSource.transaction(async (db) => {
                const existing = await db.findOne(RefreshToken, {
                    where: { tokenHash: this.hashToken(token) },
                    relations: { user: true },
                    lock: { mode: 'pessimistic_write' },
                });

                // anti theft measure
                if (existing?.revoked) {
                    revokeAllForUserId = existing.user.id;
                    this.logger.warn(`SECURITY: Refresh token reuse detected userId: ${existing.user.id}`);

                    throw new UnauthorizedException('Invalid or expired refresh token');
                }

                if (!existing) {
                    this.logger.log('Refresh token not found');

                    throw new UnauthorizedException('Invalid or expired refresh token');
                }

                // revoke old token
                await db.update(RefreshToken, existing.id, { revoked: true });

                const newEncodedToken = this.encodeToken(this.generateToken(), persistent);

                // create new token
                await db.save(db.create(RefreshToken, {
                    user: existing.user,
                    tokenHash: this.hashToken(newEncodedToken),
                }));

                const reissuedUser = userToAuthorizedUser(existing.user);

                this.logger.log(`Token reissued for userId: ${reissuedUser.id}`);

                return { refreshToken: newEncodedToken, user: reissuedUser };
            });
        } finally {
            if (revokeAllForUserId) {
                try {
                    await this.revokeTokenByUserId(revokeAllForUserId);
                } catch (error) {
                    this.logger.error(`Error revoking token for userId: ${revokeAllForUserId}`, error);
                }
            }
        }
    }
}
