import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    createCategory(createCategoryDto: CreateCategoryDto): Promise<import("./entities/category.entity").Category>;
    findAllCategories(): Promise<import("./entities/category.entity").Category[]>;
    findCategoryById(id: number): Promise<import("./entities/category.entity").Category>;
    findCategoryBySlug(slug: string, parentSlug?: string): Promise<import("./entities/category.entity").Category>;
    findCategoryByParent(id: number): Promise<import("./entities/category.entity").Category[]>;
    updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<import("./entities/category.entity").Category>;
    removeCategory(id: number): Promise<void>;
}
