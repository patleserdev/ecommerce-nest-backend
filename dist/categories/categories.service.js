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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../categories/entities/category.entity");
const media_link_entity_1 = require("../media-links/entities/media-link.entity");
let CategoriesService = class CategoriesService {
    categoriesRepository;
    mediaLinksRepository;
    constructor(categoriesRepository, mediaLinksRepository) {
        this.categoriesRepository = categoriesRepository;
        this.mediaLinksRepository = mediaLinksRepository;
    }
    async createCategory(createCategoryDto) {
        const category = this.categoriesRepository.create(createCategoryDto);
        return this.categoriesRepository.save(category);
    }
    async findAllCategories() {
        return this.categoriesRepository.find({ relations: ['products'] });
    }
    async findAllWithMedias() {
        const categories = await this.categoriesRepository.find({
            relations: ['products'],
        });
        const categoriesWithMedias = await Promise.all(categories.map((category) => this.addMediasToCategoryWithProducts(category)));
        return categoriesWithMedias;
    }
    async findCategoryById(id) {
        const category = await this.categoriesRepository.findOne({
            where: { id: id },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async findCategoryBySlug(slug, parentSlug) {
        if (parentSlug) {
            const parentCategory = await this.categoriesRepository.findOne({
                where: { slug: parentSlug },
            });
            if (!parentCategory) {
                throw new common_1.NotFoundException('parentCategory not found');
            }
            const category = await this.categoriesRepository.findOne({
                where: { slug: slug, parent_id: parentCategory.id },
                relations: ['products'],
            });
            if (!category) {
                throw new common_1.NotFoundException('Category not found with specified parent');
            }
            return this.addMediasToCategoryWithProducts(category);
        }
        else {
            const category = await this.categoriesRepository.findOne({
                where: { slug: slug },
                relations: ['products'],
            });
            if (!category) {
                throw new common_1.NotFoundException('Category not found without parent');
            }
            return this.addMediasToCategoryWithProducts(category);
        }
    }
    async findCategoryByParent(id) {
        const category = await this.categoriesRepository.find({
            where: { parent_id: id },
            order: { name: 'ASC' },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async updateCategory(id, updateCategoryDto) {
        const category = await this.findCategoryById(id);
        Object.assign(category, updateCategoryDto);
        return this.categoriesRepository.save(category);
    }
    async removeCategory(id) {
        const category = await this.findCategoryById(id);
        await this.categoriesRepository.remove(category);
    }
    async addMediasToCategoryWithProducts(category) {
        const [categoryMediaLinks, productMediaLinks] = await Promise.all([
            this.mediaLinksRepository.find({
                where: {
                    linkedType: 'category',
                    linkedId: category.id,
                },
                relations: ['media'],
            }),
            this.mediaLinksRepository.find({
                where: {
                    linkedType: 'product',
                    linkedId: (0, typeorm_2.In)(category.products.map((p) => p.id)),
                },
                relations: ['media'],
            }),
        ]);
        const categoryMedias = categoryMediaLinks.map((link) => ({
            id: link.media.id,
            url: link.media.url,
            altText: link.media.altText,
            description: link.media.description,
            title: link.media.title,
            role: link.role,
            position: link.position,
            height: link.media.height,
            width: link.media.width,
        }));
        const productMediaMap = new Map();
        for (const link of productMediaLinks) {
            if (!productMediaMap.has(link.linkedId)) {
                productMediaMap.set(link.linkedId, []);
            }
            productMediaMap.get(link.linkedId).push({
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
        const enrichedProducts = category.products.map((product) => ({
            ...product,
            medias: productMediaMap.get(product.id) ?? [],
        }));
        return {
            ...category,
            medias: categoryMedias,
            products: enrichedProducts,
        };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(media_link_entity_1.MediaLink)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map