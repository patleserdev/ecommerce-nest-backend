import { MediaLinksService } from './media-links.service';
import { CreateMediaLinkDto } from './dto/create-media-link.dto';
import { UpdateMediaLinkDto } from './dto/update-media-link.dto';
export declare class MediaLinksController {
    private readonly mediaLinksService;
    constructor(mediaLinksService: MediaLinksService);
    create(createMediaLinkDto: CreateMediaLinkDto): Promise<import("./entities/media-link.entity").MediaLink>;
    findAll(): Promise<import("./entities/media-link.entity").MediaLink[]>;
    findOne(id: string): Promise<import("./entities/media-link.entity").MediaLink>;
    update(id: string, updateMediaLinkDto: UpdateMediaLinkDto): Promise<import("./entities/media-link.entity").MediaLink>;
    removeByLinkedAndMediaId(linkedId: number, mediaId: string): Promise<{
        deleted: boolean;
    }>;
}
