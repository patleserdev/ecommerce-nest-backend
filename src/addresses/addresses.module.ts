import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adress } from './entities/address.entity';
import { AddressRolesModule } from '../address-roles/address-roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Adress]), AddressRolesModule],
  controllers: [AddressesController],
  providers: [AddressesService],
  exports: [AddressesService],
})
export class AddressesModule {}
