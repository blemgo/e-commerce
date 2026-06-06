import { AuthResponse } from '../dto/auth-response.dto';

export class AuthResult extends AuthResponse {
    refreshToken: string;
}
