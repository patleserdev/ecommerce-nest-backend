import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import { AdressRole } from 'src/address-roles/entities/address-role.entity';
export declare class Order {
    id: number;
    user: User;
    status: string;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    items: OrderItem[];
    adresses: AdressRole[];
}
export declare class OrderItem {
    id: number;
    order: Order;
    product: Product;
    quantity: number;
    price: number;
}
