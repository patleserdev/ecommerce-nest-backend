import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartItemDto {
  @ApiProperty({
    example: '5',
    description: 'quantité du produit',
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
