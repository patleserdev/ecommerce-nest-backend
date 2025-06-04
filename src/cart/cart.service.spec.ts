import { Cart, CartItem } from './entities/cart.entities';
import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
describe('CartService', () => {
  let service: CartService;

  const mockUsersService = {
    // méthodes utilisées par CartService
    findById: jest.fn().mockResolvedValue({ id: 1, name: 'John Doe' }),
  };

  const mockProductsService = {
    // méthodes utilisées par CartService
    findById: jest.fn().mockResolvedValue({ id: 1, name: 'Product A' }),
  };

  const mockCartService = {
    // mock des méthodes utilisées dans controller
    findAll: jest.fn().mockResolvedValue([]),
    // ... autres mocks si besoin
  };

  const mockCartItemService = {
    // mock des méthodes utilisées dans controller
    findAll: jest.fn().mockResolvedValue([]),
    // ... autres mocks si besoin
  };

  const mockCategoryService = {
    find: jest.fn().mockResolvedValue([]),
    // mocke ici les autres méthodes dont tu as besoin
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getRepositoryToken(Cart),
          useValue: mockCartService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
        {
          provide: getRepositoryToken(CartItem),
          useValue: mockCartItemService,
        },
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
