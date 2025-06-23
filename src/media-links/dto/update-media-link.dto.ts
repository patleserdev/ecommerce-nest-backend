import { PartialType } from '@nestjs/swagger';
import { CreateMediaLinkDto } from './create-media-link.dto';

export class UpdateMediaLinkDto extends PartialType(CreateMediaLinkDto) {}
