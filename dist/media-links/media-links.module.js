"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaLinksModule = void 0;
const common_1 = require("@nestjs/common");
const media_links_service_1 = require("./media-links.service");
const media_links_controller_1 = require("./media-links.controller");
const typeorm_1 = require("@nestjs/typeorm");
const media_link_entity_1 = require("./entities/media-link.entity");
let MediaLinksModule = class MediaLinksModule {
};
exports.MediaLinksModule = MediaLinksModule;
exports.MediaLinksModule = MediaLinksModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([media_link_entity_1.MediaLink])],
        controllers: [media_links_controller_1.MediaLinksController],
        providers: [media_links_service_1.MediaLinksService],
        exports: [media_links_service_1.MediaLinksService],
    })
], MediaLinksModule);
//# sourceMappingURL=media-links.module.js.map