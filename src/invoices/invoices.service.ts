import { Injectable } from '@nestjs/common';
import { Order } from '../orders/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async generateInvoice(orderId: number): Promise<string> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['user', 'items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // const invoiceData = {
    //   orderId: order.id,
    //   customer: {
    //     name: order.user.username,
    //     email: order.user.email,
    //   },
    //   items: order.items.map((item) => ({
    //     name: item.product.name,
    //     quantity: item.quantity,
    //     price: item.price,
    //   })),
    //   total: order.total,
    //   date: order.createdAt,
    // };

    const invoicePath = path.join(
      __dirname,
      `../../invoices/invoice_${order.id}.pdf`,
    );

    const doc: PDFKit.PDFDocument = new PDFDocument();

    // Création du fichier PDF en écriture
    doc.pipe(fs.createWriteStream(invoicePath));

    // Ajout du contenu (exemple simple)
    doc.fontSize(20).text('Facture', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Order ID: ${order.id}`);
    doc.text(`Client: ${order.user.username} (${order.user.email})`);
    doc.text(`Date: ${order.createdAt.toDateString()}`);
    doc.moveDown();

    doc.text('Produits :');
    order.items.forEach((item) => {
      doc.text(`- ${item.product.name} x ${item.quantity} : $${item.price}`);
    });

    doc.moveDown();
    doc.text(`Total : $${order.total}`, { align: 'right' });

    doc.end();
    return invoicePath;
  }
}
