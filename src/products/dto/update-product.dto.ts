import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    example: 'casquette',
    description: 'nom du produit',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: "c'est une casquette en tissu avec un logo",
    description: 'description du produit',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '35',
    description: 'prix du produit',
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    example: 'casq-w-logo',
    description: 'identifiant unique du produit',
  })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty({
    example: '10',
    description: 'quantité disponible du produit',
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty({
    example: 'chapeaux',
    description: 'catégorie du produit',
  })
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
