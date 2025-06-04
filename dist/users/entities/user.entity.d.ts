import { Order } from '../../orders/entities/order.entity';
import { Cart } from '../../cart/entities/cart.entities';
import { AdressRole } from 'src/address-roles/entities/address-role.entity';
export declare class User {
    constructor();
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    profile: string;
    orders: Order[];
    carts: Cart[];
    adresses: AdressRole[];
}
