import { Relation } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
export declare class ProductVariation {
    id: number;
    gender: 'homme' | 'femme' | 'enfant';
    size: string;
    color: string;
    stock: number;
    product: Relation<Product>;
}
