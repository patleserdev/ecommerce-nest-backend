export declare class CloudinaryService {
    constructor();
    uploadFile(buffer: Buffer): Promise<{
        publicId: string;
        url: string;
    }>;
    deleteFile(publicId: string): Promise<{
        result: string;
    }>;
}
