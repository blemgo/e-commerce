import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductCategory } from './entities/product-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryNodeDto } from './dto/category-node.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  categoryRowsToTree,
  findNode,
  getDescendantIds,
} from './utils/categoriesTree';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryNodeDto[]> {
    const { parentCategoryId } = createCategoryDto;

    if (parentCategoryId) {
      await this.findOne(parentCategoryId);
    }

    await this.productCategoryRepository.save(
      this.productCategoryRepository.create(createCategoryDto),
    );

    return this.getCategoryTree();
  }

  async getCategoryTree(): Promise<CategoryNodeDto[]> {
    const categoryRows = await this.productCategoryRepository.find();

    return categoryRowsToTree(categoryRows);
  }

  async findOne(id: string): Promise<ProductCategory> {
    const category = await this.productCategoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async getDescendantCategoryIds(categoryId: string): Promise<string[]> {
    await this.findOne(categoryId);

    const categoryTree = await this.getCategoryTree();
    const node = findNode(categoryTree, categoryId);

    return node ? getDescendantIds(node) : [categoryId];
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryNodeDto[]> {
    const category = await this.findOne(id);
    const { parentCategoryId } = updateCategoryDto;

    if (parentCategoryId !== undefined) {
      await this.validateParent(id, parentCategoryId);
    }

    Object.assign(category, updateCategoryDto);
    await this.productCategoryRepository.save(category);

    return this.getCategoryTree();
  }

  async remove(id: string): Promise<CategoryNodeDto[]> {
    const category = await this.findOne(id);

    await this.productCategoryRepository.remove(category);

    return this.getCategoryTree();
  }

  private validateParent = async (
    categoryId: string,
    parentCategoryId: string | null,
  ): Promise<void> => {
    if (parentCategoryId === null) {
      return;
    }

    if (parentCategoryId === categoryId) {
      throw new BadRequestException('A category cannot be its own parent');
    }

    await this.findOne(parentCategoryId);

    const descendantIds = await this.getDescendantCategoryIds(categoryId);

    if (descendantIds.includes(parentCategoryId)) {
      throw new BadRequestException(
        'Cannot move a category under one of its descendants',
      );
    }
  };
}
