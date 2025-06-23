import { CreateMediaLinkDto } from './dto/create-media-link.dto';
import { UpdateMediaLinkDto } from './dto/update-media-link.dto';
export declare class MediaLinksService {
    create(createMediaLinkDto: CreateMediaLinkDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateMediaLinkDto: UpdateMediaLinkDto): string;
    remove(id: number): string;
}
