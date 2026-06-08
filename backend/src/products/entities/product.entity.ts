import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ProductCategory } from 'src/categories/entities/product-category.entity';

@Entity({ schema: 'bally', name: 'product' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'product_image', type: 'text', nullable: true })
  productImage?: string;

  @Column({ name: 'qty_in_stock', type: 'int', default: 0, nullable: false })
  qtyInStock: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ManyToMany(() => ProductCategory, (cat) => cat.products)
  @JoinTable({
    name: 'product_category_link',
    schema: 'bally',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'product_category_id',
      referencedColumnName: 'id',
    },
  })
  categories: ProductCategory[];
}
