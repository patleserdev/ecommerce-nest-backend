import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemDto {
  @ApiProperty({
    example: 'casquette-123',
    description: 'identifiant du produit',
  })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({
    example: '5',
    description: 'quantité du produit',
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
