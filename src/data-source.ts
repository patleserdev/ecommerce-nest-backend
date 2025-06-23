// src/data-source.ts
import { DataSource } from 'typeorm';
import { Brand } from './brands/entities/brand.entity';
import { Cart, CartItem } from './cart/entities/cart.entities';
import { Category } from './categories/entities/category.entity';
import { Invoice } from './invoices/entities/invoice.entity';
import { Order, OrderItem } from './orders/entities/order.entity';
import { Payment } from './payments/entities/payment.entity';
import { ProductVariation } from './product-variations/entities/product-variation.entity';
import { Product } from './products/entities/product.entity';
import { User } from './users/entities/user.entity';
import { Adress } from './addresses/entities/address.entity';
import { AdressRole } from './address-roles/entities/address-role.entity';
import { Media } from './medias/entities/media.entity';
import { MediaLink } from './media-links/entities/media-link.entity';
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nest_ecommerce',
  entities: [
    Cart,
    CartItem,
    Brand,
    Category,
    Invoice,
    Order,
    OrderItem,
    Payment,
    ProductVariation,
    Product,
    User,
    Adress,
    AdressRole,
    Media,
    MediaLink,
  ], // ajoute ici toutes tes entités

  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
