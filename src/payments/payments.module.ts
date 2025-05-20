import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { UsersModule } from '../users/users.module';
import { OrdersModule } from '../orders/orders.module';
@Module({
  imports: [TypeOrmModule.forFeature([Order]), UsersModule, OrdersModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
