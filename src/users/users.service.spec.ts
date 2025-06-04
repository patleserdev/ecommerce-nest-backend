import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
describe('UsersService', () => {
  let service: UsersService;

  const mockUsersService = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    // ajoute d'autres méthodes si nécessaire
  };

  const mockAuthService = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    // ajoute d'autres méthodes si nécessaire
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [UsersModule],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
