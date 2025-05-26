import { CreateBrandDto } from './create-brand.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @ApiProperty({
    example: 'politique',
    description: 'nom de la catégorie',
  })
  @IsNotEmpty()
  @IsString()
  name?: string;
}
