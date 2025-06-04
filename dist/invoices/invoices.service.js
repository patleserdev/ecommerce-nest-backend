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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const order_entity_1 = require("../orders/entities/order.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_2 = require("@nestjs/common");
const pdfkit_1 = require("pdfkit");
const fs = require("fs");
const path = require("path");
let InvoicesService = class InvoicesService {
    ordersRepository;
    constructor(ordersRepository) {
        this.ordersRepository = ordersRepository;
    }
    async generateInvoice(orderId) {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ['user', 'items', 'items.product'],
        });
        if (!order) {
            throw new common_2.NotFoundException('Order not found');
        }
        const invoicePath = path.join(__dirname, `../../invoices/invoice_${order.id}.pdf`);
        const doc = new pdfkit_1.default();
        doc.pipe(fs.createWriteStream(invoicePath));
        doc.fontSize(20).text('Facture', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Order ID: ${order.id}`);
        doc.text(`Client: ${order.user.username} (${order.user.email})`);
        doc.text(`Date: ${order.createdAt.toDateString()}`);
        doc.moveDown();
        doc.text('Produits :');
        order.items.forEach((item) => {
            doc.text(`- ${item.product.name} x ${item.quantity} : $${item.price}`);
        });
        doc.moveDown();
        doc.text(`Total : $${order.total}`, { align: 'right' });
        doc.end();
        return invoicePath;
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map