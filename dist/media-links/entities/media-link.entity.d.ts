import { Media } from '../../medias/entities/media.entity';
import { Product } from 'src/products/entities/product.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import { Category } from 'src/categories/entities/category.entity';
export declare class MediaLink {
    id: string;
    mediaId: string;
    media: Media;
    linkedType: string;
    product: Product;
    brand: Brand;
    category: Category;
    linkedId: number;
    role: string;
    position: number;
    createdAt: Date;
}
