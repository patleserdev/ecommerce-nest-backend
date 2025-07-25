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
exports.MediaLinksController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const media_links_service_1 = require("./media-links.service");
const create_media_link_dto_1 = require("./dto/create-media-link.dto");
const update_media_link_dto_1 = require("./dto/update-media-link.dto");
let MediaLinksController = class MediaLinksController {
    mediaLinksService;
    constructor(mediaLinksService) {
        this.mediaLinksService = mediaLinksService;
    }
    create(createMediaLinkDto) {
        return this.mediaLinksService.create(createMediaLinkDto);
    }
    findAll() {
        return this.mediaLinksService.findAll();
    }
    findOne(id) {
        return this.mediaLinksService.findOne(id);
    }
    update(id, updateMediaLinkDto) {
        return this.mediaLinksService.update(id, updateMediaLinkDto);
    }
    async removeByLinkedAndMediaId(linkedId, mediaId) {
        if (!linkedId || !mediaId) {
            throw new common_2.NotFoundException('linkedId et mediaId sont requis');
        }
        return this.mediaLinksService.removeByLinkedIdAndMediaId(linkedId, mediaId);
    }
};
exports.MediaLinksController = MediaLinksController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_media_link_dto_1.CreateMediaLinkDto]),
    __metadata("design:returntype", void 0)
], MediaLinksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MediaLinksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaLinksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_media_link_dto_1.UpdateMediaLinkDto]),
    __metadata("design:returntype", void 0)
], MediaLinksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)('linkedId')),
    __param(1, (0, common_1.Query)('mediaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], MediaLinksController.prototype, "removeByLinkedAndMediaId", null);
exports.MediaLinksController = MediaLinksController = __decorate([
    (0, common_1.Controller)('media-links'),
    __metadata("design:paramtypes", [media_links_service_1.MediaLinksService])
], MediaLinksController);
//# sourceMappingURL=media-links.controller.js.map