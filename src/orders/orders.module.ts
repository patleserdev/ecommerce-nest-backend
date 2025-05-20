import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderItem } from '../orders/entities/order.entity';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { PaymentsService } from '../payments/payments.service';
import { InvoicesService } from '../invoices/invoices.service';
import { PaymentsController } from '../payments/payments.controller';
import { InvoicesController } from '../invoices/invoices.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrderItem]),
    UsersModule,
    ProductsModule,
  ],
  controllers: [OrdersController, PaymentsController, InvoicesController],
  providers: [OrdersService, TypeOrmModule, PaymentsService, InvoicesService],
  exports: [TypeOrmModule],
})
export class OrdersModule {}
