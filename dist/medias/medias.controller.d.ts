import { MediasService } from './medias.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { JwtUserPayload } from '../auth/jwt/jwt-user-payload';
export declare class MediasController {
    private readonly mediasService;
    private readonly cloudinaryService;
    constructor(mediasService: MediasService, cloudinaryService: CloudinaryService);
    create(file: Express.Multer.File, body: {
        title: string;
        description: string;
    }): Promise<import("./entities/media.entity").Media>;
    findAll(req: Request & {
        user: JwtUserPayload;
    }): Promise<import("./entities/media.entity").Media[]>;
    findOne(id: string): Promise<import("./entities/media.entity").Media>;
    update(file: Express.Multer.File, id: string, body: {
        title: string;
        description: string;
        url: string;
        pictureId: string;
        altText: string;
        fileName: string;
        width: number;
        height: number;
    }): Promise<import("./entities/media.entity").Media>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
