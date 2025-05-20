import { Controller, Post, Body, Param, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Request } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-intent/:orderId')
  @ApiOperation({ summary: 'Créer un paiement Stripe' })
  createPaymentIntent(@Param('orderId') orderId: number) {
    return this.paymentsService.createPaymentIntent(orderId);
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Gérer les webhooks Stripe' })
  async handleWebhook(@Req() request: Request) {
    const sig = request.headers['stripe-signature'] as string;
    const event = this.paymentsService.constructEvent(
      request.body as Buffer,
      sig,
    );
    await this.paymentsService.handleWebhook(event);
  }
}
