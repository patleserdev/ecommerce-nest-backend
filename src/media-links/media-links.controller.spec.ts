import { Test, TestingModule } from '@nestjs/testing';
import { MediaLinksController } from './media-links.controller';
import { MediaLinksService } from './media-links.service';

describe('MediaLinksController', () => {
  let controller: MediaLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaLinksController],
      providers: [MediaLinksService],
    }).compile();

    controller = module.get<MediaLinksController>(MediaLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
