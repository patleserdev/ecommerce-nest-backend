import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    // @InjectRepository(Product)
    // private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoriesRepository.find({ relations: ['products'] });
  }

  async findCategoryById(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id: id },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async findCategoryBySlug(
    slug: string,
    parentSlug: string,
  ): Promise<Category> {
    const parentCategory = await this.categoriesRepository.findOne({
      where: { name: parentSlug },
    });
    console.log(parentCategory);
    if (!parentCategory) {
      throw new NotFoundException('parentCategory not found');
    }

    const category = await this.categoriesRepository.findOne({
      where: { name: slug, parent_id: parentCategory.id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async findCategoryByParent(id: number): Promise<Category[]> {
    const category = await this.categoriesRepository.find({
      where: { parent_id: id },
      order: { name: 'ASC' },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findCategoryById(id);
    Object.assign(category, updateCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async removeCategory(id: number): Promise<void> {
    const category = await this.findCategoryById(id);
    await this.categoriesRepository.remove(category);
  }
}
