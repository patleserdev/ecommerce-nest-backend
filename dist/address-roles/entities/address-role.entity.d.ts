import { Adress } from '../../addresses/entities/address.entity';
import { User } from '../../users/entities/user.entity';
import { Cart } from '../../cart/entities/cart.entities';
import { Order } from '../../orders/entities/order.entity';
export type AdresseType = 'livraison' | 'facturation';
export declare class AdressRole {
    id: number;
    type: AdresseType;
    adresse: Adress;
    user: User;
    cart: Cart;
    order: Order;
}
