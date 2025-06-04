"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const products_module_1 = require("./products/products.module");
const categories_module_1 = require("./categories/categories.module");
const orders_module_1 = require("./orders/orders.module");
const payments_module_1 = require("./payments/payments.module");
const payments_service_js_1 = require("./payments/payments.service.js");
const body_parser_1 = require("body-parser");
const invoices_module_1 = require("./invoices/invoices.module");
const cart_module_1 = require("./cart/cart.module");
const product_variations_module_1 = require("./product-variations/product-variations.module");
const brands_module_1 = require("./brands/brands.module");
const config_1 = require("@nestjs/config");
const health_controller_js_1 = require("./health.controller.js");
const addresses_module_1 = require("./addresses/addresses.module");
const address_roles_module_1 = require("./address-roles/address-roles.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply((0, body_parser_1.json)({
            verify: (req, res, buf) => {
                req.rawBody = buf;
            },
        }))
            .forRoutes('payments/webhook');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE_NAME,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                autoLoadEntities: true,
                synchronize: false,
                migrationsRun: true,
                logging: true,
                logger: 'advanced-console',
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            products_module_1.ProductsModule,
            categories_module_1.CategoriesModule,
            orders_module_1.OrdersModule,
            payments_module_1.PaymentsModule,
            invoices_module_1.InvoicesModule,
            cart_module_1.CartModule,
            product_variations_module_1.ProductVariationsModule,
            brands_module_1.BrandsModule,
            addresses_module_1.AddressesModule,
            address_roles_module_1.AddressRolesModule,
        ],
        controllers: [app_controller_1.AppController, health_controller_js_1.HealthController],
        providers: [app_service_1.AppService, payments_service_js_1.PaymentsService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map