import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adress } from './entities/address.entity.js';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Adress)
    private readonly addressRepository: Repository<Adress>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Adress> {
    const address = this.addressRepository.create(createAddressDto);
    return await this.addressRepository.save(address);
  }

  async findAll(): Promise<Adress[]> {
    return await this.addressRepository.find({
      relations: ['roles'],
    });
  }

  async findAllByUser(userId: number): Promise<Adress[]> {
    return this.addressRepository
      .createQueryBuilder('address')
      .innerJoin('address.roles', 'role')
      .where('role.user.id = :userId', { userId })
      .leftJoinAndSelect('address.roles', 'roles')
      .getMany();
  }

  async findOne(id: number): Promise<Adress> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!address) {
      throw new NotFoundException(`Address #${id} not found`);
    }
    return address;
  }

  async update(id: number, updateDto: UpdateAddressDto): Promise<Adress> {
    const address = await this.findOne(id);
    Object.assign(address, updateDto);
    return await this.addressRepository.save(address);
  }

  async remove(id: number): Promise<void> {
    const address = await this.findOne(id);
    await this.addressRepository.remove(address);
  }
}
