import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
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
export declare class ProductsService {
    private productsRepository;
    private categoriesRepository;
    private brandsRepository;
    private mediaLinksRepository;
    constructor(productsRepository: Repository<Product>, categoriesRepository: Repository<Category>, brandsRepository: Repository<Category>, mediaLinksRepository: Repository<MediaLink>);
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    findAllProducts(): Promise<Product[]>;
    findAllWithMedias(): Promise<ProductWithMedia[]>;
    findProductById(id: number): Promise<Product>;
    findBySlug(slug: string): Promise<Product>;
    findProductBycategoryId(categoryId: number): Promise<Product[]>;
    updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
    removeProduct(id: number): Promise<void>;
}
