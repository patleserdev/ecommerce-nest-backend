import { Module } from '@nestjs/common';
import { MediaLinksService } from './media-links.service';
import { MediaLinksController } from './media-links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaLink } from './entities/media-link.entity';
@Module({
  imports: [TypeOrmModule.forFeature([MediaLink])],
  controllers: [MediaLinksController],
  providers: [MediaLinksService],
  exports: [MediaLinksService],
})
export class MediaLinksModule {}
