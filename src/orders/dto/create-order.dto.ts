import { IsNotEmpty, IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class OrderItemDto {
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

export class CreateOrderDto {
  @ApiProperty({
    example: 'user-123',
    description: "identifiant de l'utilisateur",
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 'user-123',
    description: "tableau d'items",
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  items: OrderItemDto[];
}
