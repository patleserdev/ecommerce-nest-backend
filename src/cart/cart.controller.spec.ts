import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
describe('CartController', () => {
  let controller: CartController;

  beforeEach(async () => {
    const mockCartService = {
      // mock des méthodes utilisées dans controller
      findAll: jest.fn().mockResolvedValue([]),
      // ... autres mocks si besoin
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: mockCartService,
        },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
