import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
