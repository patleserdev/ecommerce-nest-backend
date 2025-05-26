import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { PaymentsService } from './payments/payments.service.js';
import { json } from 'body-parser';
import { Request } from 'express';
import { InvoicesModule } from './invoices/invoices.module';
import { CartModule } from './cart/cart.module';
import { ProductVariationsModule } from './product-variations/product-variations.module';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // modifie selon ton utilisateur
      password: '', // modifie selon ton mot de passe
      database: 'nest_ecommerce', // crée cette base ou change le nom
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false, // ⚠️ à désactiver en prod
      migrationsRun: true,
      logging: true,
      logger: 'advanced-console',
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    PaymentsModule,
    InvoicesModule,
    CartModule,
    ProductVariationsModule,
    BrandsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PaymentsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        json({
          verify: (req: Request & { rawBody?: Buffer }, res, buf) => {
            req.rawBody = buf;
          },
        }),
      )
      .forRoutes('payments/webhook');
  }
}
