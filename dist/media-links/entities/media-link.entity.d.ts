import { Media } from '../../medias/entities/media.entity';
import { Product } from 'src/products/entities/product.entity';
export declare class MediaLink {
    id: string;
    mediaId: string;
    media: Media;
    linkedType: string;
    product: Product;
    linkedId: number;
    role: string;
    position: number;
    createdAt: Date;
}
