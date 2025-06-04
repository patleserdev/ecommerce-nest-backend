import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { UsersService } from '../users/users.service';
import { Stripe } from 'stripe';
export declare class PaymentsService {
    private ordersRepository;
    private usersService;
    private stripe;
    constructor(ordersRepository: Repository<Order>, usersService: UsersService);
    constructEvent(payload: Buffer | string, signature: string): Stripe.Event;
    createPaymentIntent(orderId: number): Promise<Stripe.PaymentIntent>;
    handleWebhook(event: Stripe.Event): Promise<void>;
}
