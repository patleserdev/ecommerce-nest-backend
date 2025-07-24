import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
import { Brand } from '../brands/entities/brand.entity';
import { MediaLink } from 'src/media-links/entities/media-link.entity';

export interface MediaForProduct {
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

export interface ProductWithMedia extends Omit<Product, 'generateSlug'> {
  medias: MediaForProduct[];
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Brand)
    private brandsRepository: Repository<Category>,
    @InjectRepository(MediaLink)
    private mediaLinksRepository: Repository<MediaLink>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, brandId, ...rest } = createProductDto;

    const brand = await this.brandsRepository.findOne({
      where: { id: brandId },
    });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const product = this.productsRepository.create({
      ...rest,
      category,
      brand,
    });
    return this.productsRepository.save(product);
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['category', 'variations', 'brand'],
    });
  }

  async findAllWithMedias() {
    const products = await this.productsRepository.find({
      relations: ['category', 'variations', 'brand'],
    }); // ou with relations

    const allLinks = await this.mediaLinksRepository.find({
      where: { linkedType: 'product' },
      relations: ['media'],
    });

    const productMap = new Map<number, ProductWithMedia>();

    for (const product of products) {
      productMap.set(product.id, { ...product, medias: [] });
    }

    for (const link of allLinks) {
      const product = productMap.get(link.linkedId);
      if (product) {
        product.medias.push({
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

    return Array.from(productMap.values());
  }

  async findProductById(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category', 'variations', 'brand'],
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { slug },
      relations: ['category', 'variations', 'brand'],
    });

    if (!product) {
      throw new NotFoundException(
        `Aucun produit trouvé avec le slug "${slug}"`,
      );
    }

    console.log('product', product);
    return product;
  }

  async findProductBycategoryId(categoryId: number): Promise<Product[]> {
    const products = await this.productsRepository.find({
      order: { name: 'ASC' },
      where: { category: { id: categoryId } },
      relations: ['category', 'variations', 'brand'],
    });
    if (!products || products.length === 0) {
      throw new NotFoundException('No products found for this category');
    }

    return products;
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findProductById(id);
    const { categoryId, brandId, ...rest } = updateProductDto;
    if (categoryId) {
      const category = await this.categoriesRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      product.category = category;
    }

    if (brandId) {
      const brand = await this.brandsRepository.findOne({
        where: { id: brandId },
      });
      if (!brand) {
        throw new NotFoundException('Brand not found');
      }
      product.brand = brand;
    }
    Object.assign(product, rest);
    return this.productsRepository.save(product);
  }

  async removeProduct(id: number): Promise<void> {
    const product = await this.findProductById(id);
    await this.productsRepository.remove(product);
  }

  // async createCategory(
  //   createCategoryDto: CreateCategoryDto,
  // ): Promise<Category> {
  //   const category = this.categoriesRepository.create(createCategoryDto);
  //   return this.categoriesRepository.save(category);
  // }

  // async findAllCategories(): Promise<Category[]> {
  //   return this.categoriesRepository.find({ relations: ['products'] });
  // }

  // async findCategoryById(id: number): Promise<Category> {
  //   const category = await this.categoriesRepository.findOne({
  //     where: { id: id },
  //   });
  //   if (!category) {
  //     throw new NotFoundException('Category not found');
  //   }
  //   return category;
  // }

  // async updateCategory(
  //   id: number,
  //   updateCategoryDto: UpdateCategoryDto,
  // ): Promise<Category> {
  //   const category = await this.findCategoryById(id);
  //   Object.assign(category, updateCategoryDto);
  //   return this.categoriesRepository.save(category);
  // }

  // async removeCategory(id: number): Promise<void> {
  //   const category = await this.findCategoryById(id);
  //   await this.categoriesRepository.remove(category);
  // }
}
