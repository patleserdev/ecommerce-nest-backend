// adresse-role.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Adress } from '../../addresses/entities/address.entity';
import { User } from '../../users/entities/user.entity';
import { Cart } from '../../cart/entities/cart.entities';
import { Order } from '../../orders/entities/order.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';
export type AdresseType = 'livraison' | 'facturation';

@Entity()
export class AdressRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['livraison', 'facturation'] })
  type: AdresseType;

  @ManyToOne(() => Adress, (adresse) => adresse.roles, { onDelete: 'CASCADE' })
  @JoinColumn()
  adresse: Adress;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Cart, { nullable: true })
  @JoinColumn()
  cart: Cart;

  @ManyToOne(() => Order, { nullable: true })
  @JoinColumn()
  order: Order;

  // @ManyToOne(() => Invoice, { nullable: true })
  // @JoinColumn()
  // invoice: Invoice;
}
