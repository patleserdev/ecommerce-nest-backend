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
exports.Adress = void 0;
const typeorm_1 = require("typeorm");
const address_role_entity_1 = require("../../address-roles/entities/address-role.entity");
let Adress = class Adress {
    id;
    title;
    firstName;
    lastName;
    streetAddress;
    streetAddress2;
    postalCode;
    city;
    country;
    phoneToDelivery;
    roles;
};
exports.Adress = Adress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Adress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Adress.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Adress.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Adress.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Adress.prototype, "streetAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Adress.prototype, "streetAddress2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Adress.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Adress.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Adress.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Adress.prototype, "phoneToDelivery", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => address_role_entity_1.AdressRole, (role) => role.adresse, { cascade: true }),
    __metadata("design:type", Array)
], Adress.prototype, "roles", void 0);
exports.Adress = Adress = __decorate([
    (0, typeorm_1.Entity)()
], Adress);
//# sourceMappingURL=address.entity.js.map