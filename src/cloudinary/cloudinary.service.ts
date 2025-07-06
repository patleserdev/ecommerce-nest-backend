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
  async uploadFile(
    // file: Express.Multer.File,
    buffer: Buffer,
  ): Promise<{ publicId: string; url: string }> {
    // 🧠 Récupération des dimensions avec sharp
    const metadata = await sharp(buffer).metadata();
    const width = metadata.width || 800;
    const height = metadata.height || 800;
    console.log(metadata.size);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'ecommerce',
          resource_type: 'auto',
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
          if (error) return reject(error);
          resolve({
            publicId: result!.public_id,
            url: result!.secure_url,
          });
        },
      );

      // const bufferStream = new Readable();
      // bufferStream.push(file.buffer);
      // bufferStream.push(null);
      // bufferStream.pipe(uploadStream);
      Readable.from(buffer).pipe(uploadStream);
    });
  }

  async deleteFile(publicId: string): Promise<{ result: string }> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result as { result: string });
      });
    });
  }
}
