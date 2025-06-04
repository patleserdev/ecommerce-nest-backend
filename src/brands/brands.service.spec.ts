import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from './brands.service';

describe('BrandsService', () => {
  let service: BrandsService;

  beforeEach(async () => {
    const mockBrandsService = {
      // mock des méthodes utilisées dans controller
      findAll: jest.fn().mockResolvedValue([]),
      // ... autres mocks si besoin
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BrandsService,
          useValue: mockBrandsService,
        },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
