import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateOrderStatusDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    example: 'paid',
    description: 'status de la commande',
  })
  @IsNotEmpty()
  @IsString()
  status: string;
}
