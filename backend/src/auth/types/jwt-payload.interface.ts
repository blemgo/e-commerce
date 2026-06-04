import { Role } from 'src/users/entities/enums/role.enum';

export interface JwtPayload {
    sub: string;
    email: string;
    role: Role;
    iat?: number;
    exp?: number;
}