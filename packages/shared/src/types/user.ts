import type { Role } from './role';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}

export interface UserProfile extends AuthUser {
  canChangePassword: boolean;
}

export interface UpdateProfileDTO {
  fullName: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
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
