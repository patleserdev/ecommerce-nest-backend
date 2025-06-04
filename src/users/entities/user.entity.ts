import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Cart } from '../../cart/entities/cart.entities';
import { AdressRole } from 'src/address-roles/entities/address-role.entity';
@Entity()
export class User {
  constructor() {
    if (!this.role) {
      this.role = 'customer';
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'customer' })
  role: string; // 'admin' or 'customer'

  @Column({ default: '' })
  profile: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => AdressRole, (adresse) => adresse.user)
  adresses: AdressRole[];
}
