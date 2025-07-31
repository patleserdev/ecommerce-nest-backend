import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto';
import { MediaLink } from '../media-links/entities/media-link.entity';
import { Product } from 'src/products/entities/product.entity.js';

export interface MediaForProductOrCategoryOrBrand {
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

export interface CategoryWithMedia
  extends Omit<Category, 'generateSlug' | 'products'> {
  medias: MediaForProductOrCategoryOrBrand[];
  products: ProductWithMedia[];
}

export interface ProductWithMedia extends Omit<Product, 'generateSlug'> {
  medias: MediaForProductOrCategoryOrBrand[];
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

  async findAllWithMedias(): Promise<CategoryWithMedia[]> {
    const categories = await this.categoriesRepository.find({
      relations: ['products'],
    });

    const categoriesWithMedias = await Promise.all(
      categories.map((category) =>
        this.addMediasToCategoryWithProducts(category),
      ),
    );

    return categoriesWithMedias;
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
  ): Promise<CategoryWithMedia> {
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

      return this.addMediasToCategoryWithProducts(category);
    } else {
      const category = await this.categoriesRepository.findOne({
        where: { slug: slug },
        relations: ['products'],
      });

      if (!category) {
        throw new NotFoundException('Category not found without parent');
      }

      return this.addMediasToCategoryWithProducts(category);
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

  // private async addMediasToCategory(
  //   category: Category,
  // ): Promise<CategoryWithMedia> {
  //   const mediaLinks = await this.mediaLinksRepository.find({
  //     where: {
  //       linkedType: 'category',
  //       linkedId: category.id,
  //     },
  //     relations: ['media'],
  //   });

  //   const medias = mediaLinks.map((link) => ({
  //     id: link.media.id,
  //     url: link.media.url,
  //     altText: link.media.altText,
  //     description: link.media.description,
  //     title: link.media.title,
  //     role: link.role,
  //     position: link.position,
  //     height: link.media.height,
  //     width: link.media.width,
  //   }));

  //   return {
  //     ...category,
  //     medias,
  //   };
  // }

  private async addMediasToCategoryWithProducts(
    category: Category,
  ): Promise<CategoryWithMedia> {
    const [categoryMediaLinks, productMediaLinks] = await Promise.all([
      this.mediaLinksRepository.find({
        where: {
          linkedType: 'category',
          linkedId: category.id,
        },
        relations: ['media'],
      }),
      this.mediaLinksRepository.find({
        where: {
          linkedType: 'product',
          linkedId: In(category.products.map((p) => p.id)),
        },
        relations: ['media'],
      }),
    ]);

    // Medias de la catégorie
    const categoryMedias = categoryMediaLinks.map((link) => ({
      id: link.media.id,
      url: link.media.url,
      altText: link.media.altText,
      description: link.media.description,
      title: link.media.title,
      role: link.role,
      position: link.position,
      height: link.media.height,
      width: link.media.width,
    }));

    // Création d'une map produitId => medias
    const productMediaMap = new Map<number, any[]>();
    for (const link of productMediaLinks) {
      if (!productMediaMap.has(link.linkedId)) {
        productMediaMap.set(link.linkedId, []);
      }

      productMediaMap.get(link.linkedId)!.push({
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

    // Ajouter les médias à chaque produit
    const enrichedProducts: ProductWithMedia[] = category.products.map(
      (product) => ({
        ...product,
        medias: productMediaMap.get(product.id) ?? [],
      }),
    );

    return {
      ...category,
      medias: categoryMedias,
      products: enrichedProducts,
    };
  }
}
