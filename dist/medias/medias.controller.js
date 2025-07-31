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
exports.MediasController = void 0;
const common_1 = require("@nestjs/common");
const medias_service_1 = require("./medias.service");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const sharp = require("sharp");
const jwt_guard_1 = require("../auth/jwt/jwt.guard");
let MediasController = class MediasController {
    mediasService;
    cloudinaryService;
    constructor(mediasService, cloudinaryService) {
        this.mediasService = mediasService;
        this.cloudinaryService = cloudinaryService;
    }
    async create(file, body) {
        if (!file)
            throw new Error('File is required');
        const originalMetadata = await sharp(file.buffer).metadata();
        const isPng = originalMetadata.format === 'png';
        console.log(isPng);
        const resizedBuffer = await sharp(file.buffer)
            .resize({ width: 3000, height: 3000, fit: 'inside' })[isPng ? 'png' : 'jpeg']({
            quality: 80,
            compressionLevel: 9,
        })
            .toBuffer();
        const { publicId, url } = await this.cloudinaryService.uploadFile(resizedBuffer);
        const metadata = await sharp(file.buffer).metadata();
        const width = metadata.width || 800;
        const height = metadata.height || 800;
        const format = metadata.format;
        const mimeType = `image/${format}`;
        const mediaData = {
            ...body,
            url: url,
            pictureId: publicId,
            mimetype: mimeType,
            size: file.size,
            altText: file.originalname,
            fileName: file.originalname,
            width: width,
            height: height,
        };
        return this.mediasService.create(mediaData);
    }
    findAll(req) {
        console.log('Authenticated user:', req.user);
        return this.mediasService.findAll();
    }
    findOne(id) {
        return this.mediasService.findOne(id);
    }
    async update(file, id, body) {
        const media = await this.findOne(id);
        const mediaData = {
            ...body,
        };
        console.log('body', body);
        console.log('mediaData', mediaData);
        if (file) {
            console.log('media.fileName', media.fileName, 'fileName', file.filename);
            if (media.fileName != file.filename) {
                await this.cloudinaryService.deleteFile(media.pictureId);
                const originalMetadata = await sharp(file.buffer).metadata();
                const isPng = originalMetadata.format === 'png';
                console.log(isPng);
                const resizedBuffer = await sharp(file.buffer)
                    .resize({ width: 3000, height: 3000, fit: 'inside' })[isPng ? 'png' : 'jpeg']()
                    .toBuffer();
                const { publicId, url } = await this.cloudinaryService.uploadFile(resizedBuffer);
                const metadata = await sharp(file.buffer).metadata();
                const tmpWidth = metadata.width || 800;
                const tmpHeight = metadata.height || 800;
                mediaData.width = tmpWidth;
                mediaData.height = tmpHeight;
                mediaData.pictureId = publicId;
                mediaData.url = url;
            }
        }
        return this.mediasService.update(id, mediaData);
    }
    async remove(id) {
        const media = await this.findOne(id);
        await this.cloudinaryService.deleteFile(media.pictureId);
        return this.mediasService.remove(id);
    }
};
exports.MediasController = MediasController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MediasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MediasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediasController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MediasController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MediasController.prototype, "remove", null);
exports.MediasController = MediasController = __decorate([
    (0, common_1.Controller)('medias'),
    __metadata("design:paramtypes", [medias_service_1.MediasService,
        cloudinary_service_1.CloudinaryService])
], MediasController);
//# sourceMappingURL=medias.controller.js.map