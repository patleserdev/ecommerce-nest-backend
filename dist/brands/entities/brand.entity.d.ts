import { Product } from '../../products/entities/product.entity';
export declare class Brand {
    id: number;
    name: string;
    slug: string;
    products: Product[];
    generateSlug(): void;
}
