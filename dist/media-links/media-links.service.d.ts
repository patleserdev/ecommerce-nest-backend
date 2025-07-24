import { CreateMediaLinkDto } from './dto/create-media-link.dto';
import { UpdateMediaLinkDto } from './dto/update-media-link.dto';
import { MediaLink } from './entities/media-link.entity.js';
import { Repository } from 'typeorm';
export declare class MediaLinksService {
    private mediasLinkRepository;
    constructor(mediasLinkRepository: Repository<MediaLink>);
    create(createMediaLinkDto: CreateMediaLinkDto): Promise<MediaLink>;
    findAll(): Promise<MediaLink[]>;
    findOne(id: string): Promise<MediaLink>;
    update(id: string, updateMediaDto: UpdateMediaLinkDto): Promise<MediaLink>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    removeByLinkedIdAndMediaId(linkedId: number, mediaId: string): Promise<{
        deleted: boolean;
    }>;
}
