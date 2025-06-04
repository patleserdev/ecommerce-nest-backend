import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRolesService } from './address-roles.service';
import { AddressRolesController } from './address-roles.controller';
import { AdressRole } from './entities/address-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdressRole])],
  controllers: [AddressRolesController],
  providers: [AddressRolesService],
  exports: [AddressRolesService],
})
export class AddressRolesModule {}
