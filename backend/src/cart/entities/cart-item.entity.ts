import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity({ schema: 'bally', name: 'cart_items' })
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => Product, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'int', default: 1, nullable: false })
  quantity: number;
}
