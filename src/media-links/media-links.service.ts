import { Injectable } from '@nestjs/common';
import { CreateMediaLinkDto } from './dto/create-media-link.dto';
import { UpdateMediaLinkDto } from './dto/update-media-link.dto';
import { MediaLink } from './entities/media-link.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class MediaLinksService {
  constructor(
    @InjectRepository(MediaLink)
    private mediasLinkRepository: Repository<MediaLink>,
  ) {}

  async create(createMediaLinkDto: CreateMediaLinkDto) {
    const mediaLink = this.mediasLinkRepository.create(createMediaLinkDto);
    return this.mediasLinkRepository.save(mediaLink);
  }

  async findAll() {
    return this.mediasLinkRepository.find();
  }

  async findOne(id: string): Promise<MediaLink> {
    const media = await this.mediasLinkRepository.findOne({
      where: { id: id },
    });
    if (!media) {
      throw new NotFoundException(`MediaLink with ID ${id} not found`);
    }
    return media;
  }

  async update(
    id: string,
    updateMediaDto: UpdateMediaLinkDto,
  ): Promise<MediaLink> {
    const media = await this.findOne(id);
    const updated = Object.assign(media, updateMediaDto);
    return this.mediasLinkRepository.save(updated);
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.mediasLinkRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`MediaLink with ID ${id} not found`);
    }
    return { deleted: true };
  }

  async removeByLinkedIdAndMediaId(
    linkedId: number,
    mediaId: string,
  ): Promise<{ deleted: boolean }> {
    const result = await this.mediasLinkRepository.delete({
      linkedId: linkedId,
      media: { id: mediaId },
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `MediaLink with linkedId ${linkedId} and mediaId ${mediaId} not found`,
      );
    }
    return { deleted: true };
  }
}
