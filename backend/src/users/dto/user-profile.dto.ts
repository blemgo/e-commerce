import { Role } from '../entities/enums/role.enum';

export class UserProfileDto {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  canChangePassword: boolean;
}
