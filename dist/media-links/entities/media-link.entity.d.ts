import { Media } from '../../medias/entities/media.entity';
export declare class MediaLink {
    id: string;
    mediaId: string;
    media: Media;
    linkedType: string;
    linkedId: string;
    role: string;
    position: number;
    createdAt: Date;
}
