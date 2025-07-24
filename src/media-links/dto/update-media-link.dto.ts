// update-media-link.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaLinkDto } from './create-media-link.dto';

export class UpdateMediaLinkDto extends PartialType(CreateMediaLinkDto) {}
