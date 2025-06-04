import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import { AdressRole } from 'src/address-roles/entities/address-role.entity';
export declare class Cart {
    id: number;
    user: User;
    items: CartItem[];
    adresses: AdressRole[];
}
export declare class CartItem {
    id: number;
    cart: Cart;
    product: Product;
    quantity: number;
}
