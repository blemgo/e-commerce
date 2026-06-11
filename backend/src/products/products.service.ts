import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from '../categories/entities/product-category.entity';
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

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryIds, qtyInStock, ...fields } = createProductDto;
    const categories = await this.resolveCategories(categoryIds);

    const saved = await this.productRepository.save(
      this.productRepository.create({
        ...fields,
        qtyInStock: qtyInStock ?? 0,
        categories,
      }),
    );

    return this.findOne(saved.id);
  }

  async findAll(
    query: GetProductsQueryDto,
    includeInactive = false,
  ): Promise<PaginatedProducts> {
    const qb = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'category');

    if (!includeInactive) {
      qb.andWhere('product.isActive = :isActive', { isActive: true });
    }

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

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    const { categoryIds, ...productFields } = updateProductDto;

    Object.assign(product, productFields, {
      categories:
        categoryIds === undefined
          ? product.categories
          : await this.resolveCategories(categoryIds),
    });

    await this.productRepository.save(product);

    return this.findOne(id);
  }

  async getProductWithSufficientStock(
    productId: string,
    quantity: number,
    manager?: EntityManager,
  ): Promise<Product> {
    const repository = manager
      ? manager.getRepository(Product)
      : this.productRepository;

    const product = await repository.findOne({
      where: { id: productId },
      ...(manager && { lock: { mode: 'pessimistic_write' } }),
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.qtyInStock < quantity) {
      throw new BadRequestException(`Insufficient stock for "${product.name}"`);
    }

    return product;
  }

  async decrementStock(
    productId: string,
    quantity: number,
    manager: EntityManager,
  ): Promise<void> {
    await manager.decrement(Product, { id: productId }, 'qtyInStock', quantity);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);

    product.isActive = false;

    await this.productRepository.save(product);
  }

  private resolveCategories = async (
    categoryIds?: string[],
  ): Promise<ProductCategory[]> => {
    if (!categoryIds?.length) {
      return [];
    }

    return Promise.all(
      categoryIds.map((categoryId) =>
        this.categoriesService.findOne(categoryId),
      ),
    );
  };
}
