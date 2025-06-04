import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderItem } from './entities/order.entity';
describe('OrdersController', () => {
  let controller: OrdersController;

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
      controllers: [OrdersController],
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

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
