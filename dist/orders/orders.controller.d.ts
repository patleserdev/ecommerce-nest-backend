import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(createOrderDto: CreateOrderDto): Promise<import("./entities/order.entity").Order>;
    findAllOrders(): Promise<import("./entities/order.entity").Order[]>;
    findOrderById(id: number): Promise<import("./entities/order.entity").Order>;
    updateOrderStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<import("./entities/order.entity").Order>;
    removeOrder(id: number): Promise<void>;
}
