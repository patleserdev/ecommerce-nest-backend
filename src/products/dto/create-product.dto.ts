import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
  @ApiProperty({
    example: 'casquette',
    description: 'nom du produit',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: "c'est une casquette en tissu avec un logo",
    description: 'description du produit',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 35,
    description: 'prix du produit',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'casq-w-logo',
    description: 'identifiant unique du produit',
  })
  @IsNotEmpty()
  @IsString()
  sku: string;

  @ApiProperty({
    example: 10,
    description: 'quantité disponible du produit',
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 10,
    description: 'catégorie du produit',
  })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
