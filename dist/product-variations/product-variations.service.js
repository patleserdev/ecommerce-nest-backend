"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariationsService = void 0;
const common_1 = require("@nestjs/common");
let ProductVariationsService = class ProductVariationsService {
    create(createProductVariationDto) {
        return 'This action adds a new productVariation';
    }
    findAll() {
        return `This action returns all productVariations`;
    }
    findOne(id) {
        return `This action returns a #${id} productVariation`;
    }
    update(id, updateProductVariationDto) {
        return `This action updates a #${id} productVariation`;
    }
    remove(id) {
        return `This action removes a #${id} productVariation`;
    }
};
exports.ProductVariationsService = ProductVariationsService;
exports.ProductVariationsService = ProductVariationsService = __decorate([
    (0, common_1.Injectable)()
], ProductVariationsService);
//# sourceMappingURL=product-variations.service.js.map