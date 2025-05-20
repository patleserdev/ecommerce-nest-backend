import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
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
  name: string;
}
