"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRolesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const address_roles_service_1 = require("./address-roles.service");
const address_roles_controller_1 = require("./address-roles.controller");
const address_role_entity_1 = require("./entities/address-role.entity");
let AddressRolesModule = class AddressRolesModule {
};
exports.AddressRolesModule = AddressRolesModule;
exports.AddressRolesModule = AddressRolesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([address_role_entity_1.AdressRole])],
        controllers: [address_roles_controller_1.AddressRolesController],
        providers: [address_roles_service_1.AddressRolesService],
        exports: [address_roles_service_1.AddressRolesService],
    })
], AddressRolesModule);
//# sourceMappingURL=address-roles.module.js.map