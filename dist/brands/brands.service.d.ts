import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { MediaLink } from 'src/media-links/entities/media-link.entity';
export interface MediaForBrand {
    id: string;
    url: string;
    altText?: string;
    description?: string;
    title?: string;
    role?: string;
    position: number;
    height?: number;
    width?: number;
}
export interface BrandWithMedia extends Omit<Brand, 'generateSlug'> {
    medias: MediaForBrand[];
}
export declare class BrandsService {
    private brandsRepository;
    private mediaLinksRepository;
    constructor(brandsRepository: Repository<Brand>, mediaLinksRepository: Repository<MediaLink>);
    create(createBrandDto: CreateBrandDto): Promise<Brand>;
    findAll(): Promise<Brand[]>;
    findAllWithMedias(): Promise<BrandWithMedia[]>;
    findBrandById(id: number): Promise<Brand>;
    update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand>;
    remove(id: number): Promise<void>;
}
