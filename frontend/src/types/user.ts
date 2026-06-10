import type { Role } from './role';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}

export interface LocalRegisterDTO {
  fullName: string;
  email: string;
  password: string;
}

export interface LocalLoginDTO {
  email: string;
  password: string;
  rememberMe?: boolean;
}
