import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { UsersService } from '../users/users.service';
import { Stripe } from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private usersService: UsersService,
  ) {
    this.stripe = new Stripe('YOUR_STRIPE_SECRET_KEY', {
      apiVersion: '2025-04-30.basil',
    });
  }
  constructEvent(payload: Buffer | string, signature: string): Stripe.Event {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      'process.env.STRIPE_WEBHOOK_SECRET',
    );
  }

  async createPaymentIntent(orderId: number): Promise<Stripe.PaymentIntent> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['user', 'items', 'items.product'],
    });
    if (!order) {
      throw new BadRequestException('Order not found');
    }

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(order.total * 100), // Stripe amount is in cents
      currency: 'usd',
      metadata: { orderId: order.id.toString() },
    });

    return paymentIntent;
  }

  async handleWebhook(event: Stripe.Event): Promise<void> {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata.orderId;

      const order = await this.ordersRepository.findOne({
        where: { id: Number(orderId) },
      });
      if (order) {
        order.status = 'paid';
        await this.ordersRepository.save(order);
      }
    }
  }
}
