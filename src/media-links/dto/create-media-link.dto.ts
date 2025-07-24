// create-media-link.dto.ts
import { IsString, IsOptional, IsIn, IsInt, Min } from 'class-validator';

export class CreateMediaLinkDto {
  @IsString()
  mediaId: string;

  @IsString()
  linkedType: string; // Tu peux le restreindre avec @IsIn si les valeurs sont connues

  @IsString()
  linkedId: number;

  @IsOptional()
  @IsIn(['thumbnail', 'banner', 'gallery'])
  role?: 'thumbnail' | 'banner' | 'gallery';

  @IsOptional()
  @IsInt()
  @Min(0)
  position?: number;
}
