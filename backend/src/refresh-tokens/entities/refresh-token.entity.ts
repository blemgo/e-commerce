import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity({ schema: 'bally', name: 'refresh_tokens' })
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_id' })
  @Index('idx_refresh_tokens_user_id')
  user: User;

  @Column({ name: 'token_hash', type: 'text', unique: true, nullable: false })
  tokenHash: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  revoked: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
