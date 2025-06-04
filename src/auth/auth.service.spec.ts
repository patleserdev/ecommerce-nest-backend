import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      // mock des méthodes utilisées dans controller
      findAll: jest.fn().mockResolvedValue([]),
      // ... autres mocks si besoin
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: { mockAuthService },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
