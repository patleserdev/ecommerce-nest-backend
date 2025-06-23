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
exports.AddressesController = void 0;
const common_1 = require("@nestjs/common");
const addresses_service_1 = require("./addresses.service");
const create_address_dto_1 = require("./dto/create-address.dto");
const update_address_dto_1 = require("./dto/update-address.dto");
const jwt_guard_1 = require("../auth/jwt/jwt.guard");
const create_address_role_dto_1 = require("../address-roles/dto/create-address-role.dto");
const address_roles_service_1 = require("../address-roles/address-roles.service");
let AddressesController = class AddressesController {
    addressesService;
    addressRolesService;
    constructor(addressesService, addressRolesService) {
        this.addressesService = addressesService;
        this.addressRolesService = addressRolesService;
    }
    async create(req, createAddressDto) {
        const userId = req.user.id;
        const createdAddress = await this.addressesService.create({
            ...createAddressDto,
            roles: [],
        });
        const roles = [
            {
                type: create_address_role_dto_1.AdressRoleType.NONE,
                user: { id: userId },
                adresse: { id: createdAddress.id },
            },
        ];
        if (roles.length > 1) {
            await this.addressRolesService.createMany(roles);
        }
        else {
            await this.addressRolesService.create(roles[0]);
        }
        return createdAddress;
    }
    findAll() {
        return this.addressesService.findAll();
    }
    findOne(req) {
        console.log('User in request:', req.user);
        const userId = req.user.id;
        if (!userId) {
            throw new common_1.UnauthorizedException('Accès interdit, vous ne pouvez voir que vos adresses');
        }
        return this.addressesService.findAllByUser(userId);
    }
    findAllByUser(id) {
        return this.addressesService.findOne(+id);
    }
    update(id, updateAddressDto) {
        return this.addressesService.update(+id, updateAddressDto);
    }
    remove(id) {
        return this.addressesService.remove(+id);
    }
};
exports.AddressesController = AddressesController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_address_dto_1.CreateAddressDto]),
    __metadata("design:returntype", Promise)
], AddressesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AddressesController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AddressesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AddressesController.prototype, "findAllByUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_address_dto_1.UpdateAddressDto]),
    __metadata("design:returntype", void 0)
], AddressesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AddressesController.prototype, "remove", null);
exports.AddressesController = AddressesController = __decorate([
    (0, common_1.Controller)('adresses'),
    __metadata("design:paramtypes", [addresses_service_1.AddressesService,
        address_roles_service_1.AddressRolesService])
], AddressesController);
//# sourceMappingURL=addresses.controller.js.map