import { ProductsService } from './products.service';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
import { Product } from '../products/entities/product.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    findAllProducts(): Promise<Product[]>;
    findProductById(id: number): Promise<Product>;
    findBySlug(slug: string): Promise<Product>;
    findProductBycategoryId(id: number): Promise<Product[]>;
    updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
    removeProduct(id: number): Promise<void>;
}
