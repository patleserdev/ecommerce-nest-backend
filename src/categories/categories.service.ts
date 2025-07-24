import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto';
import { MediaLink } from '../media-links/entities/media-link.entity';

export interface MediaForCategory {
  id: string;
  url: string;
  altText?: string;
  description?: string;
  title?: string;
  role?: string;
  position: number;
  height?: number;
  width?: number;
}

export interface CategoryWithMedia extends Omit<Category, 'generateSlug'> {
  medias: MediaForCategory[];
}

@Injectable()
export class CategoriesService {
  constructor(
    // @InjectRepository(Product)
    // private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(MediaLink)
    private mediaLinksRepository: Repository<MediaLink>,
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

  async findAllWithMedias() {
    const categories = await this.categoriesRepository.find({
      relations: ['products'],
    }); // ou with relations

    const allLinks = await this.mediaLinksRepository.find({
      where: { linkedType: 'category' },
      relations: ['media'],
    });

    const categoryMap = new Map<number, CategoryWithMedia>();

    for (const category of categories) {
      categoryMap.set(category.id, { ...category, medias: [] });
    }

    for (const link of allLinks) {
      const category = categoryMap.get(link.linkedId);
      if (category) {
        category.medias.push({
          id: link.media.id,
          url: link.media.url,
          altText: link.media.altText,
          description: link.media.description,
          title: link.media.title,
          role: link.role,
          position: link.position,
          height: link.media.height,
          width: link.media.width,
        });
      }
    }
    return Array.from(categoryMap.values());
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
    parentSlug?: string,
  ): Promise<Category> {
    if (parentSlug) {
      const parentCategory = await this.categoriesRepository.findOne({
        where: { slug: parentSlug },
      });

      if (!parentCategory) {
        throw new NotFoundException('parentCategory not found');
      }

      const category = await this.categoriesRepository.findOne({
        where: { slug: slug, parent_id: parentCategory.id },
        relations: ['products'],
      });

      if (!category) {
        throw new NotFoundException('Category not found with specified parent');
      }

      return category;
    } else {
      const category = await this.categoriesRepository.findOne({
        where: { slug: slug },
        relations: ['products'],
      });

      if (!category) {
        throw new NotFoundException('Category not found without parent');
      }

      return category;
    }
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
