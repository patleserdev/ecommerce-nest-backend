import { ProductVariationsService } from './product-variations.service';
import { CreateProductVariationDto } from './dto/create-product-variation.dto';
import { UpdateProductVariationDto } from './dto/update-product-variation.dto';
export declare class ProductVariationsController {
    private readonly productVariationsService;
    constructor(productVariationsService: ProductVariationsService);
    create(createProductVariationDto: CreateProductVariationDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateProductVariationDto: UpdateProductVariationDto): string;
    remove(id: string): string;
}
