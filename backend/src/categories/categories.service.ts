import { Injectable } from '@nestjs/common';
import { ProductCategory } from './entities/product-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryNode } from './interfaces/CategoryNode';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { categoryRowsToTree } from './utils/categoryRowsToTree';

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

  findOne(id: string) {
    return this.productCategoryRepository.findOne({ where: { id } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
