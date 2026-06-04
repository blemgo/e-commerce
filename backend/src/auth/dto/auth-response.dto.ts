import { AuthorizedUser } from './authorized-user.dto';

export class AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: AuthorizedUser;
}
