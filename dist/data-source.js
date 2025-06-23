"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const brand_entity_1 = require("./brands/entities/brand.entity");
const cart_entities_1 = require("./cart/entities/cart.entities");
const category_entity_1 = require("./categories/entities/category.entity");
const invoice_entity_1 = require("./invoices/entities/invoice.entity");
const order_entity_1 = require("./orders/entities/order.entity");
const payment_entity_1 = require("./payments/entities/payment.entity");
const product_variation_entity_1 = require("./product-variations/entities/product-variation.entity");
const product_entity_1 = require("./products/entities/product.entity");
const user_entity_1 = require("./users/entities/user.entity");
const address_entity_1 = require("./addresses/entities/address.entity");
const address_role_entity_1 = require("./address-roles/entities/address-role.entity");
const media_entity_1 = require("./medias/entities/media.entity");
const media_link_entity_1 = require("./media-links/entities/media-link.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nest_ecommerce',
    entities: [
        cart_entities_1.Cart,
        cart_entities_1.CartItem,
        brand_entity_1.Brand,
        category_entity_1.Category,
        invoice_entity_1.Invoice,
        order_entity_1.Order,
        order_entity_1.OrderItem,
        payment_entity_1.Payment,
        product_variation_entity_1.ProductVariation,
        product_entity_1.Product,
        user_entity_1.User,
        address_entity_1.Adress,
        address_role_entity_1.AdressRole,
        media_entity_1.Media,
        media_link_entity_1.MediaLink,
    ],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
});
//# sourceMappingURL=data-source.js.map