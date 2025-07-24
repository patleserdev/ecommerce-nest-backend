// create-media.dto.ts
import { IsString, IsOptional, IsInt, IsPositive } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  fileName: string;

  @IsString()
  url: string;

  @IsString()
  pictureId: string;

  @IsOptional()
  @IsString()
  mimeType?: string;

  @IsOptional()
  @IsString()
  extension?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  size?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  width?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  height?: number;

  @IsOptional()
  @IsString()
  altText?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
