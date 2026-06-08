import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductCategory } from './entities/product-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryNode } from './interfaces/CategoryNode';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { categoryRowsToTree, findNode, getDescendantIds } from './utils/categoriesTree';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async getCategoryTree(): Promise<CategoryNode[]> {
    const categoryRows = await this.productCategoryRepository.find();
    
    return categoryRowsToTree(categoryRows);
  }

  async findOne(id: string): Promise<ProductCategory> {
    const category = await this.productCategoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async getDescendantCategoryIds(categoryId: string): Promise<string[]> {
    const categoryTree = await this.getCategoryTree();
    
    const node = findNode(categoryTree, categoryId);

    return node ? getDescendantIds(node) : [];
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
