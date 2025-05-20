import { Controller, Get, Param, Res } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get(':orderId')
  @ApiOperation({ summary: 'Créer une facture' })
  async getInvoice(@Param('orderId') orderId: number, @Res() res: Response) {
    const invoicePath = await this.invoicesService.generateInvoice(orderId);
    res.sendFile(invoicePath, { root: '.' });
  }
}
