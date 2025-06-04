import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Request } from 'express';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addItem(req: Request, createCartItemDto: CreateCartItemDto): Promise<import("./entities/cart.entities").Cart>;
    updateItem(req: Request, itemId: number, updateCartItemDto: UpdateCartItemDto): Promise<import("./entities/cart.entities").Cart>;
    removeItem(req: Request, itemId: number): Promise<import("./entities/cart.entities").Cart>;
    getCartSummary(req: Request): Promise<import("./entities/cart.entities").Cart>;
    checkout(req: Request): Promise<{
        message: string;
    }>;
}
