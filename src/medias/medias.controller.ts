import {
  Req,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { MediasService } from './medias.service';
// import { CreateMediaDto } from './dto/create-media.dto';
// import { UpdateMediaDto } from './dto/update-media.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import * as sharp from 'sharp';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { JwtUserPayload } from '../auth/jwt/jwt-user-payload';

// file typé dans types/file.d.ts

@Controller('medias')
export class MediasController {
  constructor(
    private readonly mediasService: MediasService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file')) // "file" = nom du champ
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { title: string; description: string },
  ) {
    //je poste l'image avec title , description,
    // je récupère  mimetype et extension du fichier
    // créer l'image dans cloudinary - retourne publicId et secureUrl
    // récupérer les données
    // enregistrer
    if (!file) throw new Error('File is required');

    // je réduis tout ce qui dépasse 25mpixels
    // const resizedBuffer = await sharp(file.buffer)
    //   .resize({ width: 3000, height: 3000, fit: 'inside' }) // ou une autre limite raisonnable
    //   .jpeg({ quality: 80 })
    //   .toBuffer();
    const originalMetadata = await sharp(file.buffer).metadata();
    const isPng = originalMetadata.format === 'png';
    console.log(isPng);
    const resizedBuffer = await sharp(file.buffer)
      .resize({ width: 3000, height: 3000, fit: 'inside' })
      [isPng ? 'png' : 'jpeg']({
        quality: 80, // pour jpeg, contrôle la qualité (0-100)
        compressionLevel: 9, // pour png, compression (0-9)
        // tu peux aussi ajouter d'autres options selon le format
      })
      .toBuffer();

    // console.log('metadatatest', metadatatest.size);
    // console.log('filesize', file.size);
    // Upload to Cloudinary
    const { publicId, url } =
      await this.cloudinaryService.uploadFile(resizedBuffer);

    const metadata = await sharp(file.buffer).metadata();
    const width = metadata.width || 800;
    const height = metadata.height || 800;
    const format = metadata.format; // ex: 'jpeg'
    const mimeType = `image/${format}`;
    // Prépare les données à enregistrer (ajoute url et publicId)

    const mediaData = {
      ...body,
      url: url,
      pictureId: publicId,
      mimetype: mimeType,
      size: file.size,
      altText: file.originalname,
      fileName: file.originalname,
      width: width,
      height: height,
    };

    return this.mediasService.create(mediaData);
  }

  @Get()
  findAll(@Req() req: Request & { user: JwtUserPayload }) {
    console.log('Authenticated user:', req.user); // assure-toi que c’est bien loggé

    return this.mediasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediasService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file')) // "file" = nom du champ
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body()
    body: {
      title: string;
      description: string;
      url: string;
      pictureId: string;
      altText: string;
      fileName: string;
      width: number;
      height: number;
    },
  ) {
    const media = await this.findOne(id);

    const mediaData = {
      ...body,
    };
    // findone et comparaison =>
    console.log('body', body);
    console.log('mediaData', mediaData);
    if (file) {
      console.log('media.fileName', media.fileName, 'fileName', file.filename);
      if (media.fileName != file.filename) {
        // si le filename est différent , je supprime l'image précédente dans cloudinary et je crée la nouvelle,
        await this.cloudinaryService.deleteFile(media.pictureId);
        const originalMetadata = await sharp(file.buffer).metadata();
        const isPng = originalMetadata.format === 'png';
        console.log(isPng);
        const resizedBuffer = await sharp(file.buffer)
          .resize({ width: 3000, height: 3000, fit: 'inside' })
          [isPng ? 'png' : 'jpeg']()
          .toBuffer();

        const { publicId, url } =
          await this.cloudinaryService.uploadFile(resizedBuffer);
        const metadata = await sharp(file.buffer).metadata();
        const tmpWidth = metadata.width || 800;
        const tmpHeight = metadata.height || 800;
        mediaData.width = tmpWidth;
        mediaData.height = tmpHeight;
        mediaData.pictureId = publicId;
        mediaData.url = url;
      }
    }

    // j'update en suite le contenu
    // je transmets a update
    return this.mediasService.update(id, mediaData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    // supprimer le fichier cloudinary
    const media = await this.findOne(id);
    await this.cloudinaryService.deleteFile(media.pictureId);

    //puis remove

    return this.mediasService.remove(id);
  }
}
