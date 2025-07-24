import { Product } from '../../products/entities/product.entity';
import { MediaLink } from '../../media-links/entities/media-link.entity';
export declare class Category {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    slug: string;
    parent_id: number;
    products: Product[];
    mediaLinks: MediaLink[];
    generateSlug(): void;
}
