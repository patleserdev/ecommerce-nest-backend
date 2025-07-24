export declare class CreateMediaLinkDto {
    mediaId: string;
    linkedType: string;
    linkedId: number;
    role?: 'thumbnail' | 'banner' | 'gallery';
    position?: number;
}
