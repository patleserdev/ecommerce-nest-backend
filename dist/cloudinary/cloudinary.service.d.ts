export declare class CloudinaryService {
    constructor();
    uploadFile(file: Express.Multer.File): Promise<{
        publicId: string;
        url: string;
    }>;
    deleteFile(publicId: string): Promise<{
        result: string;
    }>;
}
