import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
// import { CreateCategoryDto } from '../categories/dto/create-category.dto';
// import { UpdateCategoryDto } from '../categories/dto/update-category.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, ...rest } = createProductDto;
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const product = this.productsRepository.create({ ...rest, category });
    return this.productsRepository.save(product);
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['category', 'variations'],
    });
  }

  async findProductById(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category', 'variations'],
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { slug },
      relations: ['category', 'variations'],
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
      relations: ['category', 'variations'],
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
    const { categoryId, ...rest } = updateProductDto;
    if (categoryId) {
      const category = await this.categoriesRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      product.category = category;
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
