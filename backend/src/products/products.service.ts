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

    return qb.distinct(true).getMany();
  }

  /* Checks if the there are products under the queried category 
  and updates the query builder accordingly
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

    qb.innerJoin('product.categories', 'category').andWhere(
      'category.id IN (:...ids)',
      { ids },
    );

    return true;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
