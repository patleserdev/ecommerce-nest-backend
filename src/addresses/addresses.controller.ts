import {
  Req,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { JwtUserPayload } from '../auth/jwt/jwt-user-payload';
import { AdressRoleType } from '../address-roles/dto/create-address-role.dto';
import { AddressRolesService } from '../address-roles/address-roles.service';

@Controller('adresses')
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly addressRolesService: AddressRolesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: Request & { user: JwtUserPayload },
    @Body() createAddressDto: CreateAddressDto,
  ) {
    const userId = req.user.id; // ou req.user.userId

    // Étape 1 : créer l’adresse sans rôles

    // Appel au service
    const createdAddress = await this.addressesService.create({
      ...createAddressDto,
      roles: [],
    });

    // Étape 2 : construire les rôles avec adresseId
    const roles = [
      {
        type: AdressRoleType.NONE,
        user: { id: userId },
        adresse: { id: createdAddress.id }, // OK pour TypeORM
      },
    ];
    // console.log(roles);
    if (roles.length > 1) {
      await this.addressRolesService.createMany(roles);
    } else {
      await this.addressRolesService.create(roles[0]);
    }

    return createdAddress;
  }

  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  findOne(@Req() req: Request & { user: JwtUserPayload }) {
    const userId = req.user.id;
    if (!userId) {
      throw new UnauthorizedException(
        'Accès interdit, vous ne pouvez voir que vos adresses',
      );
    }

    return this.addressesService.findAllByUser(userId);
  }

  @Get(':id')
  findAllByUser(@Param('id') id: string) {
    return this.addressesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressesService.remove(+id);
  }
}
