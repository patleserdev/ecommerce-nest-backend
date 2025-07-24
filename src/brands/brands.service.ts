import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { ConflictException } from '@nestjs/common';
import { MediaLink } from 'src/media-links/entities/media-link.entity';

export interface MediaForBrand {
  id: string;
  url: string;
  altText?: string;
  description?: string;
  title?: string;
  role?: string;
  position: number;
  height?: number;
  width?: number;
}

export interface BrandWithMedia extends Omit<Brand, 'generateSlug'> {
  medias: MediaForBrand[];
}

@Injectable()
export class BrandsService {
  constructor(
    // @InjectRepository(Product)
    // private productsRepository: Repository<Product>,
    @InjectRepository(Brand)
    private brandsRepository: Repository<Brand>,
    @InjectRepository(MediaLink)
    private mediaLinksRepository: Repository<MediaLink>,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const existing = await this.brandsRepository.findOneBy(createBrandDto);
    if (existing) {
      throw new ConflictException('Cette marque existe déjà.');
    }
    const brand = this.brandsRepository.create(createBrandDto);
    return this.brandsRepository.save(brand);
  }

  findAll(): Promise<Brand[]> {
    return this.brandsRepository.find({ relations: ['products'] });
  }

  async findAllWithMedias() {
    const brands = await this.brandsRepository.find({
      relations: ['products'],
    }); // ou with relations

    const allLinks = await this.mediaLinksRepository.find({
      where: { linkedType: 'brand' },
      relations: ['media'],
    });

    const brandMap = new Map<number, BrandWithMedia>();

    for (const brand of brands) {
      brandMap.set(brand.id, { ...brand, medias: [] });
    }

    for (const link of allLinks) {
      const brand = brandMap.get(link.linkedId);
      if (brand) {
        brand.medias.push({
          id: link.media.id,
          url: link.media.url,
          altText: link.media.altText,
          description: link.media.description,
          title: link.media.title,
          role: link.role,
          position: link.position,
          height: link.media.height,
          width: link.media.width,
        });
      }
    }
    return Array.from(brandMap.values());
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
