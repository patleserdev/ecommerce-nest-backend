import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { AuthModule } from '../auth/auth.module';
import { MediaLink } from '../media-links/entities/media-link.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    AuthModule,
    TypeOrmModule.forFeature([MediaLink]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService, TypeOrmModule.forFeature([Category])],
})
export class CategoriesModule {}
