import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import {
  applyCategoryFilter,
  applyPagination,
  applyQuery,
  PaginatedProducts,
} from './utils/productQueryHelpers';

export type { PaginatedProducts };

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

  async findAll(query: GetProductsQueryDto): Promise<PaginatedProducts> {
    const qb = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'category');

    await applyCategoryFilter(qb, query, (categoryId) =>
      this.categoriesService.getDescendantCategoryIds(categoryId),
    );
    applyQuery(qb, query);

    return applyPagination(qb, query);
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { categories: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
