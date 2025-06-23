import { Product } from '../../products/entities/product.entity';
export declare class Category {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    slug: string;
    parent_id: number;
    products: Product[];
    generateSlug(): void;
}
