import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderStatusDto } from './dto/update-order.dto.js';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une commande' })
  @ApiBody({ type: CreateOrderDto })
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer les commandes' })
  findAllOrders() {
    return this.ordersService.findAllOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récuperer une commande' })
  findOrderById(@Param('id') id: number) {
    return this.ordersService.findOrderById(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Modifier une commande' })
  @ApiBody({ type: UpdateOrderStatusDto })
  updateOrderStatus(
    @Param('id') id: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatus(id, updateOrderStatusDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une commande' })
  removeOrder(@Param('id') id: number) {
    return this.ordersService.removeOrder(id);
  }
}
