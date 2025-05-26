import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({
    example: '4',
    description: 'id de la catégorie parente',
  })
  @IsNumber()
  parent_id: number;

  @ApiProperty({
    example: 'politique',
    description: 'nom de la catégorie',
  })
  @IsNotEmpty()
  @IsString()
  name?: string;
}
