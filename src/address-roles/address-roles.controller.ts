import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AddressRolesService } from './address-roles.service';
import { CreateAddressRoleDto } from './dto/create-address-role.dto';
import { UpdateAddressRoleDto } from './dto/update-address-role.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { JwtUserPayload } from '../auth/jwt/jwt-user-payload';
import { BadRequestException } from '@nestjs/common';
@Controller('address-roles')
export class AddressRolesController {
  constructor(private readonly addressRolesService: AddressRolesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: Request & { user: JwtUserPayload },
    @Body() createAddressRoleDto: CreateAddressRoleDto,
  ) {
    const userId = req.user.id; // ou req.user.userId

    if (!createAddressRoleDto.type) {
      throw new BadRequestException("Le type d'adresse est requis.");
    }

    const existingAddressRole =
      await this.addressRolesService.findByUserIdAndType(
        userId,
        createAddressRoleDto.type,
      );

    if (existingAddressRole) {
      // Mise à jour de l'adresse existante
      return this.addressRolesService.update(existingAddressRole.id, {
        ...createAddressRoleDto,
      });
    }

    return this.addressRolesService.create({
      ...createAddressRoleDto,
      user: { id: userId },
    });
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
  update(
    @Param('id') id: string,
    @Body() updateAddressRoleDto: UpdateAddressRoleDto,
  ) {
    return this.addressRolesService.update(+id, updateAddressRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressRolesService.remove(+id);
  }
}
