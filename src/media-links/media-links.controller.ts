import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { MediaLinksService } from './media-links.service';
import { CreateMediaLinkDto } from './dto/create-media-link.dto';
import { UpdateMediaLinkDto } from './dto/update-media-link.dto';

@Controller('media-links')
export class MediaLinksController {
  constructor(private readonly mediaLinksService: MediaLinksService) {}

  @Post()
  create(@Body() createMediaLinkDto: CreateMediaLinkDto) {
    // créer medialink avec un produit par exemple
    //     const mediaLink = new MediaLink();
    // mediaLink.media = media;
    // mediaLink.linkedType = 'product';
    // mediaLink.linkedId = product.id;
    // mediaLink.role = 'thumbnail';

    return this.mediaLinksService.create(createMediaLinkDto);
  }

  @Get()
  findAll() {
    return this.mediaLinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaLinksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMediaLinkDto: UpdateMediaLinkDto,
  ) {
    return this.mediaLinksService.update(id, updateMediaLinkDto);
  }

  // ✅ Nouvelle route pour suppression par linkedId + mediaId en première position pour bien catch
  @Delete()
  async removeByLinkedAndMediaId(
    @Query('linkedId') linkedId: number,
    @Query('mediaId') mediaId: string,
  ) {
    if (!linkedId || !mediaId) {
      throw new NotFoundException('linkedId et mediaId sont requis');
    }
    return this.mediaLinksService.removeByLinkedIdAndMediaId(linkedId, mediaId);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mediaLinksService.remove(id);
  // }
}
