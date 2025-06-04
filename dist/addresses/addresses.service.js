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
exports.AddressesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const address_entity_js_1 = require("./entities/address.entity.js");
let AddressesService = class AddressesService {
    addressRepository;
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async create(createAddressDto) {
        const address = this.addressRepository.create(createAddressDto);
        return await this.addressRepository.save(address);
    }
    async findAll() {
        return await this.addressRepository.find({
            relations: ['roles', 'user', 'cart', 'order', 'invoice'],
        });
    }
    async findOne(id) {
        const address = await this.addressRepository.findOne({
            where: { id },
            relations: ['roles', 'user', 'cart', 'order', 'invoice'],
        });
        if (!address) {
            throw new common_1.NotFoundException(`Address #${id} not found`);
        }
        return address;
    }
    async update(id, updateDto) {
        const address = await this.findOne(id);
        Object.assign(address, updateDto);
        return await this.addressRepository.save(address);
    }
    async remove(id) {
        const address = await this.findOne(id);
        await this.addressRepository.remove(address);
    }
};
exports.AddressesService = AddressesService;
exports.AddressesService = AddressesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(address_entity_js_1.Adress)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AddressesService);
//# sourceMappingURL=addresses.service.js.map