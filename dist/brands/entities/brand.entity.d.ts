import { Product } from '../../products/entities/product.entity';
export declare class Brand {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    slug: string;
    products: Product[];
    generateSlug(): void;
}
