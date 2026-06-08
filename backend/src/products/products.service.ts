import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Product } from './entities/product.entity';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDto } from './dto/get-products-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoriesService: CategoriesService,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(query: GetProductsQueryDto): Promise<Product[]> {
    const qb = this.productRepository.createQueryBuilder('product');

    if (!(await this.checkCategoryQuery(qb, query))) {
      return [];
    }

    if (query.name) {
      qb.andWhere('product.name ILIKE :name', { name: `%${query.name}%` });
    }

    if (query.minPrice !== undefined) {
      qb.andWhere('product.price >= :minPrice', { minPrice: query.minPrice });
    }

    if (query.maxPrice !== undefined) {
      qb.andWhere('product.price <= :maxPrice', { maxPrice: query.maxPrice });
    }

    return qb.getMany();
  }

  /* Checks if products exist under the queried category and filters accordingly.
     Uses EXISTS to avoid row multiplication from the many-to-many join.
  */
  private async checkCategoryQuery(
    qb: SelectQueryBuilder<Product>,
    query: GetProductsQueryDto,
  ): Promise<boolean> {
    if (!query.category) {
      return true;
    }

    const ids = await this.categoriesService.getDescendantCategoryIds(
      query.category,
    );

    if (ids.length === 0) {
      return false;
    }

    qb.andWhere(
      `EXISTS (
        SELECT 1 FROM bally.product_category_link pcl
        WHERE pcl.product_id = product.id
        AND pcl.product_category_id IN (:...ids)
      )`,
      { ids },
    );

    return true;
  }

  findOne(id: string) {
    return `This action returns a #${id} product`;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
