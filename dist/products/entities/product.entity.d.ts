import { Relation } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { ProductVariation } from '../../product-variations/entities/product-variation.entity';
import { Brand } from '../../brands/entities/brand.entity';
export declare class Product {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    slug: string;
    description: string;
    price: number;
    sku: string;
    quantity: number;
    category: Relation<Category>;
    brand: Relation<Brand>;
    variations: Relation<ProductVariation[]>;
    generateSlug(): void;
}
