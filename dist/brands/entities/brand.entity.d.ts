import { Product } from '../../products/entities/product.entity';
import { MediaLink } from '../../media-links/entities/media-link.entity.js';
export declare class Brand {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    slug: string;
    products: Product[];
    mediaLinks: MediaLink[];
    generateSlug(): void;
}
