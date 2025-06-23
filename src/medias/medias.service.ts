import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class MediasService {
  constructor(
    @InjectRepository(Media)
    private mediasRepository: Repository<Media>,
  ) {}

  async create(createMediaDto: CreateMediaDto) {
    const media = this.mediasRepository.create(createMediaDto);
    return this.mediasRepository.save(media);
  }

  async findAll() {
    return this.mediasRepository.find();
  }

  async findOne(id: string): Promise<Media> {
    const media = await this.mediasRepository.findOne({
      where: { id: id },
    });
    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
    return media;
  }

  async update(id: string, updateMediaDto: UpdateMediaDto): Promise<Media> {
    const media = await this.findOne(id);
    const updated = Object.assign(media, updateMediaDto);
    return this.mediasRepository.save(updated);
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.mediasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
    return { deleted: true };
  }
}
