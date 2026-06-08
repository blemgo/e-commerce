import { Column, Entity, Index, PrimaryGeneratedColumn, Check } from 'typeorm';
import { AuthProvider } from './enums/auth-provider.enum';
import { Role } from './enums/role.enum';

@Entity({ schema: 'bally', name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  @Index('idx_users_email', { unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'varchar', nullable: true })
  passwordHash: string | null;

  @Column({ name: 'full_name', type: 'varchar', length: 100, nullable: false })
  @Check('full_name ~ "^[a-zA-Z\\s]+$" && length(full_name) >= 2')
  fullName: string;

  @Column({
    type: 'enum',
    enum: Role,
    enumName: 'user_role',
    default: Role.CUSTOMER,
    nullable: false,
  })
  role: Role;

  @Column({
    name: 'auth_provider',
    type: 'enum',
    enum: AuthProvider,
    enumName: 'auth_provider',
    default: AuthProvider.LOCAL,
    nullable: false,
  })
  @Index(['authProvider', 'providerId'], { unique: true })
  authProvider: AuthProvider;

  @Column({ name: 'provider_id', type: 'varchar', nullable: true })
  providerId: string | null;
}
