import { CookieOptions, Response } from 'express';
import { env } from 'src/config/env';

const ACCESS_TOKEN_COOKIE_NAME = 'access_token';

const ACCESS_TOKEN_COOKIE_OPTIONS = {
    httpOnly: true,
    path: '/',
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
} as CookieOptions;

export const setAccessTokenCookie = (res: Response, token: string): void => {
    res.cookie(ACCESS_TOKEN_COOKIE_NAME, token, ACCESS_TOKEN_COOKIE_OPTIONS);
};

export const clearAccessTokenCookie = (res: Response): void => {
    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME, ACCESS_TOKEN_COOKIE_OPTIONS);
};
