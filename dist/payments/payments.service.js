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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../orders/entities/order.entity");
const users_service_1 = require("../users/users.service");
const stripe_1 = require("stripe");
let PaymentsService = class PaymentsService {
    ordersRepository;
    usersService;
    stripe;
    constructor(ordersRepository, usersService) {
        this.ordersRepository = ordersRepository;
        this.usersService = usersService;
        this.stripe = new stripe_1.Stripe('YOUR_STRIPE_SECRET_KEY', {
            apiVersion: '2025-04-30.basil',
        });
    }
    constructEvent(payload, signature) {
        return this.stripe.webhooks.constructEvent(payload, signature, 'process.env.STRIPE_WEBHOOK_SECRET');
    }
    async createPaymentIntent(orderId) {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ['user', 'items', 'items.product'],
        });
        if (!order) {
            throw new common_1.BadRequestException('Order not found');
        }
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: Math.round(order.total * 100),
            currency: 'usd',
            metadata: { orderId: order.id.toString() },
        });
        return paymentIntent;
    }
    async handleWebhook(event) {
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            const orderId = paymentIntent.metadata.orderId;
            const order = await this.ordersRepository.findOne({
                where: { id: Number(orderId) },
            });
            if (order) {
                order.status = 'paid';
                await this.ordersRepository.save(order);
            }
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map