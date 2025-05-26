import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({
    example: 'Nike',
    description: 'nom de la marque',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
