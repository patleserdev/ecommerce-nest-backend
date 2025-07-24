"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const brand_entity_1 = require("./entities/brand.entity");
const common_2 = require("@nestjs/common");
const media_link_entity_1 = require("../media-links/entities/media-link.entity");
let BrandsService = class BrandsService {
    brandsRepository;
    mediaLinksRepository;
    constructor(brandsRepository, mediaLinksRepository) {
        this.brandsRepository = brandsRepository;
        this.mediaLinksRepository = mediaLinksRepository;
    }
    async create(createBrandDto) {
        const existing = await this.brandsRepository.findOneBy(createBrandDto);
        if (existing) {
            throw new common_2.ConflictException('Cette marque existe déjà.');
        }
        const brand = this.brandsRepository.create(createBrandDto);
        return this.brandsRepository.save(brand);
    }
    findAll() {
        return this.brandsRepository.find({ relations: ['products'] });
    }
    async findAllWithMedias() {
        const brands = await this.brandsRepository.find({
            relations: ['products'],
        });
        const allLinks = await this.mediaLinksRepository.find({
            where: { linkedType: 'brand' },
            relations: ['media'],
        });
        const brandMap = new Map();
        for (const brand of brands) {
            brandMap.set(brand.id, { ...brand, medias: [] });
        }
        for (const link of allLinks) {
            const brand = brandMap.get(link.linkedId);
            if (brand) {
                brand.medias.push({
                    id: link.media.id,
                    url: link.media.url,
                    altText: link.media.altText,
                    description: link.media.description,
                    title: link.media.title,
                    role: link.role,
                    position: link.position,
                    height: link.media.height,
                    width: link.media.width,
                });
            }
        }
        return Array.from(brandMap.values());
    }
    async findBrandById(id) {
        const category = await this.brandsRepository.findOne({
            where: { id: id },
        });
        if (!category) {
            throw new common_1.NotFoundException('Brand not found');
        }
        return category;
    }
    async update(id, updateBrandDto) {
        const brand = await this.findBrandById(id);
        Object.assign(brand, updateBrandDto);
        const result = this.brandsRepository.save(brand);
        console.log(result);
        return result;
    }
    async remove(id) {
        const brand = await this.findBrandById(id);
        await this.brandsRepository.remove(brand);
    }
};
exports.BrandsService = BrandsService;
exports.BrandsService = BrandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(brand_entity_1.Brand)),
    __param(1, (0, typeorm_1.InjectRepository)(media_link_entity_1.MediaLink)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BrandsService);
//# sourceMappingURL=brands.service.js.map