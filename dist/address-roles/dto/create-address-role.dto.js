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
exports.CreateAddressRoleDto = exports.AdressRoleType = void 0;
const class_validator_1 = require("class-validator");
var AdressRoleType;
(function (AdressRoleType) {
    AdressRoleType["NONE"] = "none";
    AdressRoleType["LIVRAISON"] = "livraison";
    AdressRoleType["FACTURATION"] = "facturation";
})(AdressRoleType || (exports.AdressRoleType = AdressRoleType = {}));
class CreateAddressRoleDto {
    adresse;
    type;
    user;
    cart;
    order;
    invoice;
}
exports.CreateAddressRoleDto = CreateAddressRoleDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(AdressRoleType),
    __metadata("design:type", String)
], CreateAddressRoleDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateAddressRoleDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Object)
], CreateAddressRoleDto.prototype, "cart", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Object)
], CreateAddressRoleDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Object)
], CreateAddressRoleDto.prototype, "invoice", void 0);
//# sourceMappingURL=create-address-role.dto.js.map