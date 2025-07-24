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
export declare class CategoriesService {
    private categoriesRepository;
    private mediaLinksRepository;
    constructor(categoriesRepository: Repository<Category>, mediaLinksRepository: Repository<MediaLink>);
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAllCategories(): Promise<Category[]>;
    findAllWithMedias(): Promise<CategoryWithMedia[]>;
    findCategoryById(id: number): Promise<Category>;
    findCategoryBySlug(slug: string, parentSlug?: string): Promise<Category>;
    findCategoryByParent(id: number): Promise<Category[]>;
    updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    removeCategory(id: number): Promise<void>;
}
