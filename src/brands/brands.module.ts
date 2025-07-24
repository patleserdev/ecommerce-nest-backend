import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../brands/entities/brand.entity';
import { MediaLink } from '../media-links/entities/media-link.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Brand]),
    TypeOrmModule.forFeature([MediaLink]),
  ],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
