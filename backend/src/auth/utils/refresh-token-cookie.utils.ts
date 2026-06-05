import { CookieOptions, Response } from 'express';
import ms from 'ms';
import { env } from 'src/config/env';

const REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';

const REFRESH_TOKEN_COOKIE_OPTIONS = {
    httpOnly: true,
    path: '/auth/refresh',
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
} as CookieOptions;

export const setRefreshTokenCookie = (res: Response, token: string): void => {
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, token, {
        ...REFRESH_TOKEN_COOKIE_OPTIONS,
        maxAge: ms(env.REFRESH_TOKEN_EXPIRES_IN),
    });
};

export const clearRefreshTokenCookie = (res: Response): void => {
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_OPTIONS);
};
