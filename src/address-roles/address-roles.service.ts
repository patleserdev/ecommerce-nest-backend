import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdressRole } from './entities/address-role.entity';
import { CreateAddressRoleDto } from './dto/create-address-role.dto';
import { UpdateAddressRoleDto } from './dto/update-address-role.dto';

@Injectable()
export class AddressRolesService {
  constructor(
    @InjectRepository(AdressRole)
    private readonly addressRoleRepository: Repository<AdressRole>,
  ) {}

  async create(createDto: CreateAddressRoleDto): Promise<AdressRole> {
    const role = this.addressRoleRepository.create(createDto);
    return await this.addressRoleRepository.save(role);
  }

  async findAll(): Promise<AdressRole[]> {
    return await this.addressRoleRepository.find({
      relations: ['adresse', 'user', 'cart', 'order', 'invoice'],
    });
  }

  async findOne(id: number): Promise<AdressRole> {
    const role = await this.addressRoleRepository.findOne({
      where: { id },
      relations: ['adresse', 'user', 'cart', 'order', 'invoice'],
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
