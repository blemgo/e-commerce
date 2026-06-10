import { User } from '../entities/user.entity';
import { UserProfileDto } from '../dto/user-profile.dto';

export const userToProfile = (user: User): UserProfileDto => ({
  id: user.id,
  email: user.email,
  fullName: user.fullName,
  role: user.role,
  authProvider: user.authProvider,
});
