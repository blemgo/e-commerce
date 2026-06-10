import { Role } from '../entities/enums/role.enum';
import { AuthProvider } from '../entities/enums/auth-provider.enum';

export class UserProfileDto {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  authProvider: AuthProvider;
}
