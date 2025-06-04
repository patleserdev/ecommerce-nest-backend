import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto';
export declare class CategoriesService {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAllCategories(): Promise<Category[]>;
    findCategoryById(id: number): Promise<Category>;
    findCategoryBySlug(slug: string, parentSlug?: string): Promise<Category>;
    findCategoryByParent(id: number): Promise<Category[]>;
    updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    removeCategory(id: number): Promise<void>;
}
