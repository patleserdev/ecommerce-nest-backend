import { Adress } from '../../addresses/entities/address.entity';
import { User } from '../../users/entities/user.entity';
import { Cart } from '../../cart/entities/cart.entities';
import { Order } from '../../orders/entities/order.entity';
import { AdressRoleType } from '../dto/create-address-role.dto';
export declare class AdressRole {
    id: number;
    type: AdressRoleType;
    adresse: Adress;
    user: User;
    cart: Cart;
    order: Order;
}
