import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { AuthProvider } from './enums/auth-provider.enum';
import { Role } from './enums/role.enum';

@Entity({ schema: 'bally', name: 'users' })
@Unique(['authProvider', 'providerId'])
@Index('idx_users_email', ['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ name: 'password_hash', type: 'varchar', nullable: true })
  passwordHash: string | null;

  @Column({ name: 'full_name', type: 'varchar' })
  fullName: string;

  @Column({
    type: 'enum',
    enum: Role,
    enumName: 'user_role',
    default: Role.CUSTOMER,
  })
  role: Role;

  @Column({
    name: 'auth_provider',
    type: 'enum',
    enum: AuthProvider,
    enumName: 'auth_provider',
    default: AuthProvider.LOCAL,
  })
  authProvider: AuthProvider;

  @Column({ name: 'provider_id', type: 'varchar', nullable: true })
  providerId: string | null;
}
