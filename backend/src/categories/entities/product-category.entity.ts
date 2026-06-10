import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Entity({ schema: 'bally', name: 'product_category' })
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'category_name', type: 'text', nullable: false })
  categoryName: string;

  @Column({ name: 'parent_category_id', type: 'uuid', nullable: true })
  parentCategoryId: string | null;

  @ManyToOne(() => ProductCategory, (cat) => cat.children, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_category_id' })
  parent: ProductCategory | null;

  @OneToMany(() => ProductCategory, (cat) => cat.parent)
  children: ProductCategory[];

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
