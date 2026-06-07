import { CookieOptions, Response } from 'express';
import { env } from 'src/config/env';

const REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';
const COOKIE_MAX_AGE_MS = 400 * 24 * 60 * 60 * 1000; // 400 days browser maximum

const REFRESH_TOKEN_COOKIE_OPTIONS = {
    httpOnly: true,
    path: '/auth/refresh',
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
} as CookieOptions;

export const setRefreshTokenCookie = (res: Response, token: string, persistent = false): void => {
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, token, {
        ...REFRESH_TOKEN_COOKIE_OPTIONS,
        ...(persistent && { maxAge: COOKIE_MAX_AGE_MS }),
    });
};

export const clearRefreshTokenCookie = (res: Response): void => {
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_OPTIONS);
};
