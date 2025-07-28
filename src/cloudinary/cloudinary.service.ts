import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import * as sharp from 'sharp';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
  async uploadFile(buffer: Buffer): Promise<{ publicId: string; url: string }> {
    const metadata = await sharp(buffer).metadata();
    const width = metadata.width || 800;
    const height = metadata.height || 800;

    // Détection du format
    const isPng = metadata.format === 'png';
    console.log('ispng', isPng);
    // Conversion dans le bon format
    const processedBuffer = await sharp(buffer)
      [isPng ? 'png' : 'jpeg']()
      .toBuffer();

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'ecommerce',
          resource_type: 'image', // Cloudinary détecte automatiquement le type
          transformation: [
            {
              width,
              height,
              crop: 'fit',
              aspect_ratio: `${width}:${height}`,
            },
          ],
        },
        (error, result) => {
          if (error)
            return reject(new Error(error.message || String(error.message)));

          resolve({
            publicId: result!.public_id,
            url: result!.secure_url,
          });
        },
      );

      Readable.from(processedBuffer).pipe(uploadStream);
    });
  }

  async deleteFile(publicId: string): Promise<{ result: string }> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(new Error(error || String(error)));

        resolve(result as { result: string });
      });
    });
  }
}
