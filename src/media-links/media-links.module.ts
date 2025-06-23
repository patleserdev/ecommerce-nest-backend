import { Module } from '@nestjs/common';
import { MediaLinksService } from './media-links.service';
import { MediaLinksController } from './media-links.controller';

@Module({
  controllers: [MediaLinksController],
  providers: [MediaLinksService],
})
export class MediaLinksModule {}
