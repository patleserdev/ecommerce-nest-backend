import { Repository } from 'typeorm';
import { Cart, CartItem } from './entities/cart.entities';
import { CreateCartItemDto } from './dto/create-cart-item.dto.js';
import { UpdateCartItemDto } from './dto/update-cart-item.dto.js';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
export declare class CartService {
    private cartRepository;
    private cartItemRepository;
    private usersService;
    private productsService;
    constructor(cartRepository: Repository<Cart>, cartItemRepository: Repository<CartItem>, usersService: UsersService, productsService: ProductsService);
    findOrCreateCart(userId: number): Promise<Cart>;
    addItem(userId: number, createCartItemDto: CreateCartItemDto): Promise<Cart>;
    updateItem(userId: number, cartItemId: number, updateCartItemDto: UpdateCartItemDto): Promise<Cart>;
    removeItem(userId: number, cartItemId: number): Promise<Cart>;
    getCartSummary(userId: number): Promise<Cart>;
    clearCart(userId: number): Promise<void>;
}
