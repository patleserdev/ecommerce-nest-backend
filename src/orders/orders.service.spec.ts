import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderItem } from './entities/order.entity';
describe('OrdersService', () => {
  let service: OrdersService;

  const mockOrderService = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    // ajoute d'autres méthodes si nécessaire
  };

  const mockOrderItemService = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    // ajoute d'autres méthodes si nécessaire
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: OrdersService,
          useValue: mockOrderService,
        },
        {
          provide: getRepositoryToken(OrderItem),
          useValue: mockOrderItemService,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
