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
exports.AddressRolesController = void 0;
const common_1 = require("@nestjs/common");
const address_roles_service_1 = require("./address-roles.service");
const create_address_role_dto_1 = require("./dto/create-address-role.dto");
const update_address_role_dto_1 = require("./dto/update-address-role.dto");
const jwt_guard_1 = require("../auth/jwt/jwt.guard");
const common_2 = require("@nestjs/common");
let AddressRolesController = class AddressRolesController {
    addressRolesService;
    constructor(addressRolesService) {
        this.addressRolesService = addressRolesService;
    }
    async create(req, createAddressRoleDto) {
        const userId = req.user.id;
        if (!createAddressRoleDto.type) {
            throw new common_2.BadRequestException("Le type d'adresse est requis.");
        }
        const existingAddressRole = await this.addressRolesService.findByUserIdAndType(userId, createAddressRoleDto.type);
        if (existingAddressRole) {
            return this.addressRolesService.update(existingAddressRole.id, {
                ...createAddressRoleDto,
            });
        }
        return this.addressRolesService.create({
            ...createAddressRoleDto,
            user: { id: userId },
        });
    }
    findAll() {
        return this.addressRolesService.findAll();
    }
    findOne(id) {
        return this.addressRolesService.findOne(+id);
    }
    update(id, updateAddressRoleDto) {
        return this.addressRolesService.update(+id, updateAddressRoleDto);
    }
    remove(id) {
        return this.addressRolesService.remove(+id);
    }
};
exports.AddressRolesController = AddressRolesController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_address_role_dto_1.CreateAddressRoleDto]),
    __metadata("design:returntype", Promise)
], AddressRolesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AddressRolesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AddressRolesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_address_role_dto_1.UpdateAddressRoleDto]),
    __metadata("design:returntype", void 0)
], AddressRolesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AddressRolesController.prototype, "remove", null);
exports.AddressRolesController = AddressRolesController = __decorate([
    (0, common_1.Controller)('address-roles'),
    __metadata("design:paramtypes", [address_roles_service_1.AddressRolesService])
], AddressRolesController);
//# sourceMappingURL=address-roles.controller.js.map