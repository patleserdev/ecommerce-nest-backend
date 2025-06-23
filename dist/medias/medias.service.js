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
exports.MediasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const media_entity_1 = require("./entities/media.entity");
const common_2 = require("@nestjs/common");
let MediasService = class MediasService {
    mediasRepository;
    constructor(mediasRepository) {
        this.mediasRepository = mediasRepository;
    }
    async create(createMediaDto) {
        const media = this.mediasRepository.create(createMediaDto);
        return this.mediasRepository.save(media);
    }
    async findAll() {
        return this.mediasRepository.find();
    }
    async findOne(id) {
        const media = await this.mediasRepository.findOne({
            where: { id: id },
        });
        if (!media) {
            throw new common_2.NotFoundException(`Media with ID ${id} not found`);
        }
        return media;
    }
    async update(id, updateMediaDto) {
        const media = await this.findOne(id);
        const updated = Object.assign(media, updateMediaDto);
        return this.mediasRepository.save(updated);
    }
    async remove(id) {
        const result = await this.mediasRepository.delete(id);
        if (result.affected === 0) {
            throw new common_2.NotFoundException(`Media with ID ${id} not found`);
        }
        return { deleted: true };
    }
};
exports.MediasService = MediasService;
exports.MediasService = MediasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(media_entity_1.Media)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MediasService);
//# sourceMappingURL=medias.service.js.map