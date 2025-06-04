import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesService } from './invoices.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderItem } from '../orders/entities/order.entity';
import { OrdersService } from '../orders/orders.service';
describe('InvoicesService', () => {
  let service: InvoicesService;

  const mockInvoicesService = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    // ajoute d'autres méthodes si nécessaire
  };

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
          provide: InvoicesService,
          useValue: mockInvoicesService,
        },
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

    service = module.get<InvoicesService>(InvoicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
