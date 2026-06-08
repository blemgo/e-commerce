import type { Role } from './role';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}

export interface LocalLoginResponse {
  user: User;
  accessToken: string;
}

export interface RefreshResponse {
  user: User;
  accessToken: string;
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
