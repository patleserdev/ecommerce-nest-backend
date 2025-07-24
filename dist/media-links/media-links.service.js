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
exports.MediaLinksService = void 0;
const common_1 = require("@nestjs/common");
const media_link_entity_js_1 = require("./entities/media-link.entity.js");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_2 = require("@nestjs/common");
let MediaLinksService = class MediaLinksService {
    mediasLinkRepository;
    constructor(mediasLinkRepository) {
        this.mediasLinkRepository = mediasLinkRepository;
    }
    async create(createMediaLinkDto) {
        const mediaLink = this.mediasLinkRepository.create(createMediaLinkDto);
        return this.mediasLinkRepository.save(mediaLink);
    }
    async findAll() {
        return this.mediasLinkRepository.find();
    }
    async findOne(id) {
        const media = await this.mediasLinkRepository.findOne({
            where: { id: id },
        });
        if (!media) {
            throw new common_2.NotFoundException(`MediaLink with ID ${id} not found`);
        }
        return media;
    }
    async update(id, updateMediaDto) {
        const media = await this.findOne(id);
        const updated = Object.assign(media, updateMediaDto);
        return this.mediasLinkRepository.save(updated);
    }
    async remove(id) {
        const result = await this.mediasLinkRepository.delete(id);
        if (result.affected === 0) {
            throw new common_2.NotFoundException(`MediaLink with ID ${id} not found`);
        }
        return { deleted: true };
    }
    async removeByLinkedIdAndMediaId(linkedId, mediaId) {
        const result = await this.mediasLinkRepository.delete({
            linkedId: linkedId,
            media: { id: mediaId },
        });
        if (result.affected === 0) {
            throw new common_2.NotFoundException(`MediaLink with linkedId ${linkedId} and mediaId ${mediaId} not found`);
        }
        return { deleted: true };
    }
};
exports.MediaLinksService = MediaLinksService;
exports.MediaLinksService = MediaLinksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(media_link_entity_js_1.MediaLink)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], MediaLinksService);
//# sourceMappingURL=media-links.service.js.map