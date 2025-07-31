import { Repository } from 'typeorm';
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
export interface CategoryWithMedia extends Omit<Category, 'generateSlug' | 'products'> {
    medias: MediaForProductOrCategoryOrBrand[];
    products: ProductWithMedia[];
}
export interface ProductWithMedia extends Omit<Product, 'generateSlug'> {
    medias: MediaForProductOrCategoryOrBrand[];
}
export declare class CategoriesService {
    private categoriesRepository;
    private mediaLinksRepository;
    constructor(categoriesRepository: Repository<Category>, mediaLinksRepository: Repository<MediaLink>);
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAllCategories(): Promise<Category[]>;
    findAllWithMedias(): Promise<CategoryWithMedia[]>;
    findCategoryById(id: number): Promise<Category>;
    findCategoryBySlug(slug: string, parentSlug?: string): Promise<CategoryWithMedia>;
    findCategoryByParent(id: number): Promise<Category[]>;
    updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    removeCategory(id: number): Promise<void>;
    private addMediasToCategoryWithProducts;
}
