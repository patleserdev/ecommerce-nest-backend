import { Repository } from 'typeorm';
import { Order, OrderItem } from '../orders/entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderStatusDto } from './dto/update-order.dto.js';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
export declare class OrdersService {
    private ordersRepository;
    private orderItemsRepository;
    private usersService;
    private productsService;
    constructor(ordersRepository: Repository<Order>, orderItemsRepository: Repository<OrderItem>, usersService: UsersService, productsService: ProductsService);
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    findAllOrders(): Promise<Order[]>;
    findOrderById(id: number): Promise<Order>;
    updateOrderStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order>;
    removeOrder(id: number): Promise<void>;
}
