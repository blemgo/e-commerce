import { AuthorizedUser } from '../dto/authorized-user.dto';
import { User } from 'src/users/entities/user.entity';

export const userToAuthorizedUser = (user: User): AuthorizedUser => ({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
});
