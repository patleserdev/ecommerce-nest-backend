import { Order } from '../orders/entities/order.entity';
import { Repository } from 'typeorm';
export declare class InvoicesService {
    private ordersRepository;
    constructor(ordersRepository: Repository<Order>);
    generateInvoice(orderId: number): Promise<string>;
}
