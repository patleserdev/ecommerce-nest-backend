import { Test, TestingModule } from '@nestjs/testing';
import { AddressRolesController } from './address-roles.controller';
import { AddressRolesService } from './address-roles.service';

describe('AddressRolesController', () => {
  let controller: AddressRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressRolesController],
      providers: [AddressRolesService],
    }).compile();

    controller = module.get<AddressRolesController>(AddressRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
