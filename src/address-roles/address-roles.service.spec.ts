import { Test, TestingModule } from '@nestjs/testing';
import { AddressRolesService } from './address-roles.service';

describe('AddressRolesService', () => {
  let service: AddressRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressRolesService],
    }).compile();

    service = module.get<AddressRolesService>(AddressRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
