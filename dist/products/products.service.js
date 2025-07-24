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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../products/entities/product.entity");
const category_entity_1 = require("../categories/entities/category.entity");
const brand_entity_1 = require("../brands/entities/brand.entity");
const media_link_entity_1 = require("../media-links/entities/media-link.entity");
let ProductsService = class ProductsService {
    productsRepository;
    categoriesRepository;
    brandsRepository;
    mediaLinksRepository;
    constructor(productsRepository, categoriesRepository, brandsRepository, mediaLinksRepository) {
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
        this.brandsRepository = brandsRepository;
        this.mediaLinksRepository = mediaLinksRepository;
    }
    async createProduct(createProductDto) {
        const { categoryId, brandId, ...rest } = createProductDto;
        const brand = await this.brandsRepository.findOne({
            where: { id: brandId },
        });
        if (!brand) {
            throw new common_1.NotFoundException('Brand not found');
        }
        const category = await this.categoriesRepository.findOne({
            where: { id: categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        const product = this.productsRepository.create({
            ...rest,
            category,
            brand,
        });
        return this.productsRepository.save(product);
    }
    async findAllProducts() {
        return this.productsRepository.find({
            relations: ['category', 'variations', 'brand'],
        });
    }
    async findAllWithMedias() {
        const products = await this.productsRepository.find();
        const allLinks = await this.mediaLinksRepository.find({
            where: { linkedType: 'product' },
            relations: ['media'],
        });
        const productMap = new Map();
        for (const product of products) {
            productMap.set(product.id, { ...product, medias: [] });
        }
        for (const link of allLinks) {
            const product = productMap.get(link.linkedId);
            if (product) {
                product.medias.push({
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
        return Array.from(productMap.values());
    }
    async findProductById(id) {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: ['category', 'variations', 'brand'],
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async findBySlug(slug) {
        const product = await this.productsRepository.findOne({
            where: { slug },
            relations: ['category', 'variations', 'brand'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Aucun produit trouvé avec le slug "${slug}"`);
        }
        console.log('product', product);
        return product;
    }
    async findProductBycategoryId(categoryId) {
        const products = await this.productsRepository.find({
            order: { name: 'ASC' },
            where: { category: { id: categoryId } },
            relations: ['category', 'variations', 'brand'],
        });
        if (!products || products.length === 0) {
            throw new common_1.NotFoundException('No products found for this category');
        }
        return products;
    }
    async updateProduct(id, updateProductDto) {
        const product = await this.findProductById(id);
        const { categoryId, brandId, ...rest } = updateProductDto;
        if (categoryId) {
            const category = await this.categoriesRepository.findOne({
                where: { id: categoryId },
            });
            if (!category) {
                throw new common_1.NotFoundException('Category not found');
            }
            product.category = category;
        }
        if (brandId) {
            const brand = await this.brandsRepository.findOne({
                where: { id: brandId },
            });
            if (!brand) {
                throw new common_1.NotFoundException('Brand not found');
            }
            product.brand = brand;
        }
        Object.assign(product, rest);
        return this.productsRepository.save(product);
    }
    async removeProduct(id) {
        const product = await this.findProductById(id);
        await this.productsRepository.remove(product);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(brand_entity_1.Brand)),
    __param(3, (0, typeorm_1.InjectRepository)(media_link_entity_1.MediaLink)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map