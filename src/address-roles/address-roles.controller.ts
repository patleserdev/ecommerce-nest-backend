import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddressRolesService } from './address-roles.service';
import { CreateAddressRoleDto } from './dto/create-address-role.dto';
import { UpdateAddressRoleDto } from './dto/update-address-role.dto';

@Controller('address-roles')
export class AddressRolesController {
  constructor(private readonly addressRolesService: AddressRolesService) {}

  @Post()
  create(@Body() createAddressRoleDto: CreateAddressRoleDto) {
    return this.addressRolesService.create(createAddressRoleDto);
  }

  @Get()
  findAll() {
    return this.addressRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressRolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressRoleDto: UpdateAddressRoleDto) {
    return this.addressRolesService.update(+id, updateAddressRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressRolesService.remove(+id);
  }
}
