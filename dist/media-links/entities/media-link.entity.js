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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaLink = void 0;
const typeorm_1 = require("typeorm");
const media_entity_1 = require("../../medias/entities/media.entity");
const product_entity_1 = require("../../products/entities/product.entity");
const brand_entity_1 = require("../../brands/entities/brand.entity");
const category_entity_1 = require("../../categories/entities/category.entity");
let MediaLink = class MediaLink {
    id;
    mediaId;
    media;
    linkedType;
    product;
    brand;
    category;
    linkedId;
    role;
    position;
    createdAt;
};
exports.MediaLink = MediaLink;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MediaLink.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MediaLink.prototype, "mediaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => media_entity_1.Media, (media) => media.links, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'mediaId' }),
    __metadata("design:type", media_entity_1.Media)
], MediaLink.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MediaLink.prototype, "linkedType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.mediaLinks, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'linkedId' }),
    __metadata("design:type", product_entity_1.Product)
], MediaLink.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => brand_entity_1.Brand, (brand) => brand.mediaLinks, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'linkedId' }),
    __metadata("design:type", brand_entity_1.Brand)
], MediaLink.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.mediaLinks, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'linkedId' }),
    __metadata("design:type", category_entity_1.Category)
], MediaLink.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MediaLink.prototype, "linkedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MediaLink.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], MediaLink.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MediaLink.prototype, "createdAt", void 0);
exports.MediaLink = MediaLink = __decorate([
    (0, typeorm_1.Entity)()
], MediaLink);
//# sourceMappingURL=media-link.entity.js.map