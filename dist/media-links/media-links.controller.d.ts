import { MediaLinksService } from './media-links.service';
import { CreateMediaLinkDto } from './dto/create-media-link.dto';
import { UpdateMediaLinkDto } from './dto/update-media-link.dto';
export declare class MediaLinksController {
    private readonly mediaLinksService;
    constructor(mediaLinksService: MediaLinksService);
    create(createMediaLinkDto: CreateMediaLinkDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMediaLinkDto: UpdateMediaLinkDto): string;
    remove(id: string): string;
}
