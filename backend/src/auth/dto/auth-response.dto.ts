import { AuthorizedUser } from './authorized-user.dto';

export class AuthResponse {
    accessToken: string;
    user: AuthorizedUser;
}
