import { Injectable } from '@nestjs/common';
import { CreateMediaLinkDto } from './dto/create-media-link.dto';
import { UpdateMediaLinkDto } from './dto/update-media-link.dto';

@Injectable()
export class MediaLinksService {
  create(createMediaLinkDto: CreateMediaLinkDto) {
    return 'This action adds a new mediaLink';
  }

  findAll() {
    return `This action returns all mediaLinks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mediaLink`;
  }

  update(id: number, updateMediaLinkDto: UpdateMediaLinkDto) {
    return `This action updates a #${id} mediaLink`;
  }

  remove(id: number) {
    return `This action removes a #${id} mediaLink`;
  }
}
