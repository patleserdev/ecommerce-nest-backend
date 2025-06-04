import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
export declare class ProductsService {
    private productsRepository;
    private categoriesRepository;
    private brandsRepository;
    constructor(productsRepository: Repository<Product>, categoriesRepository: Repository<Category>, brandsRepository: Repository<Category>);
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    findAllProducts(): Promise<Product[]>;
    findProductById(id: number): Promise<Product>;
    findBySlug(slug: string): Promise<Product>;
    findProductBycategoryId(categoryId: number): Promise<Product[]>;
    updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
    removeProduct(id: number): Promise<void>;
}
