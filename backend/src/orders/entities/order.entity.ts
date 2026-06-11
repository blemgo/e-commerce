import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Address } from 'src/address/entities/address.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from './order-status.enum';
import { decimalTransformer } from 'src/utils/decimal.transformer';

@Entity({ schema: 'bally', name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT', nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Address, { onDelete: 'RESTRICT', nullable: false })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    enumName: 'order_status',
    default: OrderStatus.PROCESSING,
    nullable: false,
  })
  status: OrderStatus;

  @Column({ name: 'tracking_id', type: 'text', nullable: false })
  trackingId: string;

  @Column({
    name: 'total_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: decimalTransformer,
  })
  totalAmount: number;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
