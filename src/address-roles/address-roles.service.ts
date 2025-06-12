import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdressRole } from './entities/address-role.entity';
import {
  AdressRoleType,
  CreateAddressRoleDto,
} from './dto/create-address-role.dto';
import { UpdateAddressRoleDto } from './dto/update-address-role.dto';

@Injectable()
export class AddressRolesService {
  constructor(
    @InjectRepository(AdressRole)
    private readonly addressRoleRepository: Repository<AdressRole>,
  ) {}

  async create(createDto: CreateAddressRoleDto): Promise<AdressRole> {
    const { adresse, user, type, cart, order } = createDto;
    // Vérifie s'il existe déjà un rôle identique
    const where: CreateAddressRoleDto = {
      adresse: { id: adresse.id },
      user: { id: user.id },
      type,
    };

    if (cart?.id) {
      where.cart = { id: cart.id };
    }

    if (order?.id) {
      where.order = { id: order.id };
    }

    const existing = await this.addressRoleRepository.findOne({ where });

    if (existing) {
      return existing; // ou tu peux throw une erreur si tu préfères
    }

    const role = this.addressRoleRepository.create(createDto);
    return await this.addressRoleRepository.save(role);
  }

  async createMany(createDtos: CreateAddressRoleDto[]): Promise<AdressRole[]> {
    const roles = this.addressRoleRepository.create(createDtos);
    return await this.addressRoleRepository.save(roles);
  }

  async findByUserIdAndType(
    userId: number,
    type: AdressRoleType,
  ): Promise<AdressRole | null> {
    return await this.addressRoleRepository.findOne({
      where: {
        user: { id: userId },
        type,
      },
    });
  }

  async findAll(): Promise<AdressRole[]> {
    return await this.addressRoleRepository.find({
      relations: ['adresse', 'user', 'cart', 'order'],
    });
  }

  async findOne(id: number): Promise<AdressRole> {
    const role = await this.addressRoleRepository.findOne({
      where: { id },
      relations: ['adresse', 'user', 'cart', 'order'],
    });
    if (!role) {
      throw new NotFoundException(`AddressRole #${id} not found`);
    }
    return role;
  }

  async update(
    id: number,
    updateDto: UpdateAddressRoleDto,
  ): Promise<AdressRole> {
    const role = await this.findOne(id);
    Object.assign(role, updateDto);
    return await this.addressRoleRepository.save(role);
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);
    await this.addressRoleRepository.remove(role);
  }
}
