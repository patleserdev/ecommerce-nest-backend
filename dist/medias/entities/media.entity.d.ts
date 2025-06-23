import { MediaLink } from '../../media-links/entities/media-link.entity';
export declare class Media {
    id: string;
    fileName: string;
    url: string;
    pictureId: string;
    mimeType: string;
    extension: string;
    size: number;
    width: number;
    height: number;
    altText: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    links: MediaLink[];
}
