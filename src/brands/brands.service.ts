import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity.js';
@Injectable()
export class BrandsService {
  constructor(
    // @InjectRepository(Product)
    // private productsRepository: Repository<Product>,
    @InjectRepository(Brand)
    private brandsRepository: Repository<Brand>,
  ) {}

  create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = this.brandsRepository.create(createBrandDto);
    return this.brandsRepository.save(brand);
  }

  findAll(): Promise<Brand[]> {
    return this.brandsRepository.find({ relations: ['products'] });
  }

  async findBrandById(id: number): Promise<Brand> {
    const category = await this.brandsRepository.findOne({
      where: { id: id },
    });
    if (!category) {
      throw new NotFoundException('Brand not found');
    }
    return category;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const brand = await this.findBrandById(id); // retourne un seul Brand
    Object.assign(brand, updateBrandDto);
    const result = this.brandsRepository.save(brand);
    console.log(result);
    return result;
  }

  async remove(id: number): Promise<void> {
    const brand = await this.findBrandById(id);
    await this.brandsRepository.remove(brand);
  }
}
