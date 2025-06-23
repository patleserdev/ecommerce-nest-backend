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
import { AdressRoleType } from '../dto/create-address-role.dto';

@Entity()
export class AdressRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['none', 'livraison', 'facturation'] })
  type: AdressRoleType;

  @ManyToOne(() => Adress, (adresse) => adresse.roles, { onDelete: 'CASCADE' })
  @JoinColumn()
  adresse: Adress;

  @ManyToOne(() => User, { nullable: true, eager: false })
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
