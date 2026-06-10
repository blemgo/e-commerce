import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Address } from './address.entity';

@Entity({ schema: 'bally', name: 'user_address' })
export class UserAddress {
  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  userId: string;

  @PrimaryColumn({ name: 'address_id', type: 'uuid' })
  addressId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Address, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column({ name: 'is_default', type: 'boolean', default: false, nullable: false })
  isDefault: boolean;
}
