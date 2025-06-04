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
exports.AddressRolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const address_role_entity_1 = require("./entities/address-role.entity");
let AddressRolesService = class AddressRolesService {
    addressRoleRepository;
    constructor(addressRoleRepository) {
        this.addressRoleRepository = addressRoleRepository;
    }
    async create(createDto) {
        const role = this.addressRoleRepository.create(createDto);
        return await this.addressRoleRepository.save(role);
    }
    async findAll() {
        return await this.addressRoleRepository.find({
            relations: ['adresse', 'user', 'cart', 'order', 'invoice'],
        });
    }
    async findOne(id) {
        const role = await this.addressRoleRepository.findOne({
            where: { id },
            relations: ['adresse', 'user', 'cart', 'order', 'invoice'],
        });
        if (!role) {
            throw new common_1.NotFoundException(`AddressRole #${id} not found`);
        }
        return role;
    }
    async update(id, updateDto) {
        const role = await this.findOne(id);
        Object.assign(role, updateDto);
        return await this.addressRoleRepository.save(role);
    }
    async remove(id) {
        const role = await this.findOne(id);
        await this.addressRoleRepository.remove(role);
    }
};
exports.AddressRolesService = AddressRolesService;
exports.AddressRolesService = AddressRolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(address_role_entity_1.AdressRole)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AddressRolesService);
//# sourceMappingURL=address-roles.service.js.map