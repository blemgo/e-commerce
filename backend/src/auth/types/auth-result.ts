import { AuthorizedUser } from '../dto/authorized-user.dto';

export class AuthResult {
    accessToken: string;
    refreshToken: string;
    user: AuthorizedUser;
}
