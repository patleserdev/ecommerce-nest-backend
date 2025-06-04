import { CreateProductVariationDto } from './dto/create-product-variation.dto';
import { UpdateProductVariationDto } from './dto/update-product-variation.dto';
export declare class ProductVariationsService {
    create(createProductVariationDto: CreateProductVariationDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateProductVariationDto: UpdateProductVariationDto): string;
    remove(id: number): string;
}
