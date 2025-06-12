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
exports.AdressRole = void 0;
const typeorm_1 = require("typeorm");
const address_entity_1 = require("../../addresses/entities/address.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const cart_entities_1 = require("../../cart/entities/cart.entities");
const order_entity_1 = require("../../orders/entities/order.entity");
const create_address_role_dto_js_1 = require("../dto/create-address-role.dto.js");
let AdressRole = class AdressRole {
    id;
    type;
    adresse;
    user;
    cart;
    order;
};
exports.AdressRole = AdressRole;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AdressRole.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['none', 'livraison', 'facturation'] }),
    __metadata("design:type", String)
], AdressRole.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => address_entity_1.Adress, (adresse) => adresse.roles, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", address_entity_1.Adress)
], AdressRole.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, eager: false }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], AdressRole.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cart_entities_1.Cart, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", cart_entities_1.Cart)
], AdressRole.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", order_entity_1.Order)
], AdressRole.prototype, "order", void 0);
exports.AdressRole = AdressRole = __decorate([
    (0, typeorm_1.Entity)()
], AdressRole);
//# sourceMappingURL=address-role.entity.js.map