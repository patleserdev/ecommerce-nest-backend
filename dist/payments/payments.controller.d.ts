import { PaymentsService } from './payments.service';
import { Request } from 'express';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createPaymentIntent(orderId: number): Promise<import("stripe").Stripe.PaymentIntent>;
    handleWebhook(request: Request): Promise<void>;
}
