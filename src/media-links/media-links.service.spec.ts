import { Test, TestingModule } from '@nestjs/testing';
import { MediaLinksService } from './media-links.service';

describe('MediaLinksService', () => {
  let service: MediaLinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaLinksService],
    }).compile();

    service = module.get<MediaLinksService>(MediaLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
